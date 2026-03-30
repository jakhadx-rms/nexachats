import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, ArrowLeft, Mail } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <MessageSquare className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">NexaChat</span>
        </div>

        {!sent ? (
          <>
            <h1 className="text-2xl font-bold mb-1">Reset password</h1>
            <p className="text-sm text-muted-foreground mb-8">We'll send you a reset link</p>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-muted/60 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
                />
              </div>
              <button type="submit" className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Check your email</h2>
            <p className="text-sm text-muted-foreground">We've sent a reset link to <span className="font-medium text-foreground">{email}</span></p>
          </motion.div>
        )}

        <Link to="/login" className="flex items-center gap-1 justify-center text-sm text-muted-foreground mt-6 hover:text-primary transition-colors">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to login
        </Link>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
