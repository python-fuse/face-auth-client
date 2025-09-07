import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Scan, Lock } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const features = [
    {
      icon: Shield,
      title: "Examination Security",
      description:
        "Prevent impersonation during exams with advanced facial recognition verification",
    },
    {
      icon: Scan,
      title: "Student Verification",
      description:
        "Instant student identity confirmation using biometric technology",
    },
    {
      icon: Lock,
      title: "Academic Integrity",
      description:
        "Maintain the highest standards of academic honesty and security",
    },
  ];

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
            AFUSTA BiometricAuth
          </span>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/auth")}
          className="hover:bg-blue-50 hover:border-blue-300"
        >
          Sign In
        </Button>
      </motion.nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6"
            variants={fadeInUp}
          >
            <span className="text-3xl md:text-4xl block mb-4 text-blue-600 font-medium">
              Abdullahi Fodio University of Science & Technology
            </span>
            Secure Student Verification with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
              Biometric Authentication
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Advanced biometric face recognition system designed specifically for
            AFUSTA's security examinations and student verification processes.
            Ensuring academic integrity through cutting-edge facial recognition
            technology.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Student Registration & Login
            </Button>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="mt-32 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
                <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Demo Section */}
        <motion.div
          className="mt-32 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-12 max-w-2xl mx-auto">
            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-2xl flex items-center justify-center mb-8">
              <Scan className="h-24 w-24 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Secure Your Academic Journey?
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Join AFUSTA students in experiencing the most secure and reliable
              examination and verification system
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
            >
              Start Student Verification
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="mt-32 bg-slate-900 dark:bg-slate-950 text-white py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Shield className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-semibold">AFUSTA BiometricAuth</span>
          </div>
          <p className="text-slate-400">
            Abdullahi Fodio University of Science & Technology
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Secure • Reliable • Academic Integrity • Student Verification
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default LandingPage;
