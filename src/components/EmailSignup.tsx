
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Form validation schema
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  preferredUsername: z.string().min(3, {
    message: "Preferred username must be at least 3 characters.",
  }),
  countryCode: z.string({
    required_error: "Please select a country code.",
  }),
  mobileNumber: z.string().min(5, {
    message: "Please enter a valid mobile number.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const countryCodes = [
  { value: "+91", label: "India (+91)" },
  { value: "+1", label: "USA (+1)" },
  { value: "+44", label: "UK (+44)" },
  { value: "+61", label: "Australia (+61)" },
  { value: "+86", label: "China (+86)" },
  { value: "+81", label: "Japan (+81)" },
  { value: "+49", label: "Germany (+49)" },
  { value: "+33", label: "France (+33)" },
  { value: "+7", label: "Russia (+7)" },
  { value: "+55", label: "Brazil (+55)" },
];

const EmailSignup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      fullName: '',
      preferredUsername: '',
      countryCode: '+91', // Default to India code
      mobileNumber: '',
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Check for duplicate email
      const { data: emailExists, error: emailError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', values.email)
        .maybeSingle();

      if (emailExists) {
        toast({
          title: "Email already registered",
          description: "This email is already in use. Please try another.",
          variant: "destructive",
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      // Check for duplicate username
      const { data: usernameExists, error: usernameError } = await supabase
        .from('profiles')
        .select('preferred_username')
        .eq('preferred_username', values.preferredUsername)
        .maybeSingle();

      if (usernameExists) {
        toast({
          title: "Username already taken",
          description: "This username is already in use. Please choose another.",
          variant: "destructive",
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      // Check for duplicate mobile number
      const { data: mobileExists, error: mobileError } = await supabase
        .from('profiles')
        .select('mobile_number')
        .eq('mobile_number', values.mobileNumber)
        .eq('country_code', values.countryCode)
        .maybeSingle();

      if (mobileExists) {
        toast({
          title: "Mobile number already registered",
          description: "This mobile number is already in use. Please try another.",
          variant: "destructive",
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      // Create the insert data without the id field
      // The database will generate the UUID automatically with the default value
      const { error } = await supabase
        .from('profiles')
        .insert([{
          email: values.email,
          full_name: values.fullName,
          preferred_username: values.preferredUsername,
          country_code: values.countryCode,
          mobile_number: values.mobileNumber,
        }]);

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
          description: "This information is already registered with us.",
          variant: "destructive",
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
                <FormLabel className="text-gray-300">Email Address</FormLabel>
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
            name="preferredUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Preferred Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Choose a username"
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
            name="countryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Country Code</FormLabel>
                <Select 
                  defaultValue={field.value} 
                  onValueChange={field.onChange}
                  required
                >
                  <FormControl>
                    <SelectTrigger className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-poker-gold/50 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                      <SelectValue placeholder="Select country code" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-800 border border-white/20 text-white">
                    {countryCodes.map((code) => (
                      <SelectItem key={code.value} value={code.value}>
                        {code.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                    required
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
