import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";
import { PROFILE } from "../../content/profileData";

interface ContactDialogProps {
  triggerType: "button" | "text"; // Prop to determine the trigger type
}

function ContactDialog({ triggerType }: ContactDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "sending" | "sent" | "timeout"
  >("idle");
  const [dialogOpen, setDialogOpen] = useState(false); // Manage dialog visibility

  // Validate form input fields
  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Email address is invalid.";
    if (!message.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors); // Update errors state
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (validateForm()) {
      // Validate form before submission
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);

      try {
        setSubmissionStatus("sending"); // Update status to sending

        // Promise to handle timeout
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Request timed out.")), 15000),
        );

        // Race the fetch request against the timeout promise
        const response = await Promise.race([
          fetch(`https://formsubmit.co/${PROFILE.email}`, {
            method: "POST",
            body: formData,
            headers: {
              Accept: "application/json",
            },
          }),
          timeoutPromise,
        ]);

        // Check if response is okay
        if (response.ok) {
          setSubmissionStatus("sent");
          // Reset form fields after successful submission
          setName("");
          setEmail("");
          setMessage("");
          setErrors({});
          setTimeout(() => {
            setDialogOpen(false); // Close dialog after 3 seconds
            setSubmissionStatus("idle"); // Reset status
          }, 3000);
        } else {
          const errorResponse: { message: string } = await response.json();
          setSubmissionStatus("idle");
        }
      } catch (error) {
        // Handle errors from the fetch request
        if (error instanceof Error) {
          if (error.message === "Request timed out.") {
            setErrors({
              ...errors,
              message:
                "Request timed out. If the issue persists, please contact me via GitHub issues.",
            });
          } else {
            setErrors({
              ...errors,
              message:
                "Unknown error. If the issue persists, please contact me via GitHub issues.",
            });
          }
        }
        setSubmissionStatus("idle");
      }
    }
  };

  // Handle dialog open/close events
  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (open) {
      // Reset form fields and state when the dialog opens
      setErrors({});
      setSubmissionStatus("idle");
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  // Handle input changes and validate errors
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name && e.target.value.trim()) {
      setErrors((prev) => ({ ...prev, name: undefined })); // Clear name error if valid
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email && /\S+@\S+\.\S+/.test(e.target.value.trim())) {
      setErrors((prev) => ({ ...prev, email: undefined })); // Clear email error if valid
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (errors.message && e.target.value.trim()) {
      setErrors((prev) => ({ ...prev, message: undefined })); // Clear message error if valid
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        {triggerType === "button" ? (
          <Button aria-label="email">
            <Mail />
          </Button>
        ) : (
          <Button variant="link" className="p-0 h-4 text-md">
            Email
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave a message</DialogTitle>
          <DialogDescription>
            You can get in touch with me through this form below
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <div className="col-span-3">
              <Input
                id="name"
                value={name}
                onChange={handleNameChange}
                placeholder="John Doe"
                disabled={submissionStatus === "sending"}
              />
              {errors.name && (
                <div className="text-red-500 text-xs px-3">{errors.name}</div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <div className="col-span-3">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="john.doe@example.com"
                disabled={submissionStatus === "sending"}
              />
              {errors.email && (
                <div className="text-red-500 text-xs px-3">{errors.email}</div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="message" className="text-right">
              Message
            </Label>
            <div className="col-span-3">
              <Textarea
                id="message"
                value={message}
                onChange={handleMessageChange}
                placeholder="Enter your message here"
                style={{ maxHeight: "250px" }}
                disabled={submissionStatus === "sending"}
              />
              {errors.message && (
                <div className="text-red-500 text-xs px-3">
                  {errors.message}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={submissionStatus === "sending"}>
              {submissionStatus === "idle" && "Send Message"}
              {submissionStatus === "sending" && "Sending..."}
              {submissionStatus === "sent" && "Message Sent"}
              {submissionStatus === "timeout" && "Try again"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ContactDialog;
