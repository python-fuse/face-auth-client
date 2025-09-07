import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, User, Clock, CheckCircle, Hash, Mail } from "lucide-react";

const DashboardPage = () => {
  const { user } = useAuth();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const stats = [
    {
      title: "Authentication Status",
      value: "Verified",
      icon: CheckCircle,
      description: "Your identity has been confirmed",
      color: "text-green-600",
    },
    {
      title: "Security Level",
      value: "High",
      icon: Shield,
      description: "Biometric authentication active",
      color: "text-blue-600",
    },
    {
      title: "Last Login",
      value: "Just now",
      icon: Clock,
      description: "Your most recent access",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-start space-x-6 mb-8">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            {user?.faceSample ? (
              <img
                src={`http://localhost:5000/${user.faceSample}`}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Welcome back, {user?.name}!
            </h1>
            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <div className="flex items-center space-x-2">
                <Hash className="h-4 w-4" />
                <span>Admission Number: {user?.admissionNumber}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email: {user?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {stats.map((stat, index) => (
          <motion.div key={index} variants={fadeInUp}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span>Authentication History</span>
            </CardTitle>
            <CardDescription>
              Recent authentication attempts and security events
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: "2 minutes ago",
                  action: "Face Recognition Login",
                  status: "Success",
                  ip: "192.168.1.1",
                },
                {
                  time: "1 hour ago",
                  action: "Face Recognition Registration",
                  status: "Success",
                  ip: "192.168.1.1",
                },
                {
                  time: "Yesterday",
                  action: "Face Recognition Login",
                  status: "Success",
                  ip: "192.168.1.2",
                },
              ].map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {event.action}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {event.time} • IP: {event.ip}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded-full">
                    {event.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
