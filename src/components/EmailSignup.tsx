
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

// Form validation schema
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).optional(),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }).optional(),
  countryCode: z.string().optional(),
  mobileNumber: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const EmailSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      fullName: '',
      username: '',
      countryCode: '',
      mobileNumber: '',
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Create the insert data without the id field
      // The database will generate the UUID automatically with the default value
      const { error } = await supabase
        .from('profiles')
        .insert({
          email: values.email,
          full_name: values.fullName || null,
          preferred_username: values.username || null,
          country_code: values.countryCode || null,
          mobile_number: values.mobileNumber || null,
        });

      if (error) throw error;
      
      // Show success toast
      toast({
        title: "You're on the list!",
        description: "We'll notify you when we launch.",
        duration: 5000,
      });
      
      // Reset form
      form.reset();
    } catch (error: any) {
      // Handle specific error for duplicate email
      if (error.code === '23505') {
        toast({
          title: "Already registered",
          description: "This email is already registered with us.",
          duration: 5000,
        });
      } else {
        // Generic error handling
        toast({
          title: "Something went wrong",
          description: error.message || "Please try again later.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md mx-auto w-full space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-gray-300">Email Address*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email address"
                    required
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-poker-gold/50 shadow-[0_0_15px_rgba(255,215,0,0.1)]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your full name"
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-poker-gold/50 shadow-[0_0_15px_rgba(255,215,0,0.1)]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Choose a username"
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-poker-gold/50 shadow-[0_0_15px_rgba(255,215,0,0.1)]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Country Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+1"
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-poker-gold/50 shadow-[0_0_15px_rgba(255,215,0,0.1)]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobileNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Mobile Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your mobile number"
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-poker-gold/50 shadow-[0_0_15px_rgba(255,215,0,0.1)]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-poker-gold to-poker-royal text-white font-medium rounded-lg transition-all shadow-[0_0_20px_rgba(255,215,0,0.2)] disabled:opacity-70 mt-4"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </span>
          ) : (
            "Join Waitlist"
          )}
        </motion.button>
        <p className="text-xs text-gray-400 mt-2 text-center">
          We respect your privacy. No spam, ever.
        </p>
      </form>
    </Form>
  );
};

export default EmailSignup;
