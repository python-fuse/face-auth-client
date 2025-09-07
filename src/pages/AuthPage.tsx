import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, ArrowLeft, User, Mail, Hash } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { authAPI } from "@/api/auth";
import { toast } from "sonner";
import CameraCapture from "@/components/CameraCapture";

const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    admissionNumber: "",
    email: "",
  });
  const [faceSnapshot, setFaceSnapshot] = useState<{
    blob: Blob | null;
    dataUrl: string | null;
  }>({
    blob: null,
    dataUrl: null,
  });

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!faceSnapshot.blob) {
      toast.error("Please capture your face photo first");
      return;
    }

    if (authMode === "register" && (!formData.name || !formData.email)) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.admissionNumber) {
      toast.error("Please enter your admission number");
      return;
    }

    setIsLoading(true);

    try {
      let response;

      if (authMode === "register") {
        response = await authAPI.register({
          name: formData.name,
          admissionNumber: formData.admissionNumber,
          email: formData.email,
          faceSnapshot: faceSnapshot.blob,
        });
      } else {
        response = await authAPI.login({
          admissionNumber: formData.admissionNumber,
          faceSnapshot: faceSnapshot.blob,
        });
      }

      login(response.token, response.user);
      toast.success(response.message);
      navigate("/dashboard");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        `${
          authMode === "register" ? "Registration" : "Login"
        } failed. Please try again.`;
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCameraCapture = (blob: Blob, dataUrl: string) => {
    setFaceSnapshot({ blob, dataUrl });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <motion.nav
        className="flex justify-between items-center p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-bold text-slate-900 dark:text-white">
            AFUSTABiometricAuth
          </span>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="hover:bg-blue-50 hover:border-blue-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </motion.nav>

      <div className="container mx-auto px-6 py-12">
        <motion.div
          className="max-w-lg mx-auto"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Shield className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">
                {authMode === "login"
                  ? "Face Recognition Login"
                  : "Register New Student"}
              </CardTitle>
              <CardDescription>
                {authMode === "login"
                  ? "Enter your admission number and capture your face to login"
                  : "Fill in your details and capture your face to register"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Camera Capture Section */}
              <div className="space-y-3">
                <Label className="text-base font-medium">Face Capture</Label>
                <CameraCapture
                  onCapture={handleCameraCapture}
                  isCapturing={isLoading}
                />
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {authMode === "register" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <Label htmlFor="admissionNumber">Admission Number</Label>
                  <div className="relative">
                    <Hash className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                    <Input
                      id="admissionNumber"
                      name="admissionNumber"
                      type="text"
                      placeholder="e.g., 2210203068"
                      value={formData.admissionNumber}
                      onChange={handleInputChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isLoading || !faceSnapshot.blob}
                >
                  {isLoading
                    ? authMode === "register"
                      ? "Registering..."
                      : "Logging in..."
                    : authMode === "register"
                    ? "Register"
                    : "Login"}
                </Button>
              </form>

              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() =>
                    setAuthMode(authMode === "login" ? "register" : "login")
                  }
                  className="text-sm"
                  disabled={isLoading}
                >
                  {authMode === "login"
                    ? "New student? Register here"
                    : "Already registered? Login here"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
