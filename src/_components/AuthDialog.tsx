"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
 import {
  NotificationMessage,
  NotificationProps,
  NotificationType,
} from "./notification";
import { AuthService } from "@/network/authConfig";

export default function AuthDialog() {
  const { login, signup } = AuthService();
  const [isOpen, setIsOpen] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState("");
  const [notification, setNotification] = useState<NotificationProps | null>(
    null
  );
  const showNotification = (type: NotificationType, message: string) => {
    setNotification({ type, message });
  };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const emailOrUsername = formData.get("emailOrUsername") as string;
    const password = formData.get("loginPassword") as string;

    if (!emailOrUsername || !password) {
      setLoginError("Please fill in all fields");
      return;
    }

    login({ emailOrUsername, password }, (success, error, response) => {
      if (success) {
        showNotification("success", response.message);
      } else {
        console.error("Login failed:", error);
        showNotification("error", "Incorrect Credentials");
      }
    });
    setLoginError("");
    setIsOpen(false);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("signupPassword") as string;

    if (!email || !username || !password) {
      setSignupError("Please fill in all fields");
      return;
    }
    signup({ email, username, password }, (success, error, response) => {
      if (success) {
        showNotification("success", response.message);
      } else {
        console.error("Signup failed:", error);
        showNotification("error", response.message);
      }
    });
    setSignupError("");
    setIsOpen(false);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [notification]);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="sm" disabled>
            Login / Sign Up
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Authentication</DialogTitle>
            <DialogDescription>
              Login to your account or create a new one.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="emailOrUsername">Email or Username</Label>
                  <Input id="emailOrUsername" name="emailOrUsername" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="loginPassword">Password</Label>
                  <Input
                    id="loginPassword"
                    name="loginPassword"
                    type="password"
                    required
                  />
                </div>
                {loginError && (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {loginError}
                  </div>
                )}
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signupPassword">Password</Label>
                  <Input
                    id="signupPassword"
                    name="signupPassword"
                    type="password"
                    required
                  />
                </div>
                {signupError && (
                  <div className="text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {signupError}
                  </div>
                )}
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      {notification && (
        <NotificationMessage
          type={notification.type}
          message={notification.message}
        />
      )}
    </>
  );
}