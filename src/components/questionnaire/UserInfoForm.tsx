import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const userInfoSchema = z.object({
  name: z.string().trim().min(2, { message: "Name must be at least 2 characters" }).max(100, { message: "Name must be less than 100 characters" }),
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string().trim().min(10, { message: "Please enter a valid phone number" }).max(20, { message: "Phone number is too long" }),
});

export type UserInfo = z.infer<typeof userInfoSchema>;

interface UserInfoFormProps {
  onSubmit: (data: UserInfo) => void;
}

export const UserInfoForm = ({ onSubmit }: UserInfoFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<UserInfo>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const handleFormSubmit = async (data: UserInfo) => {
    setIsLoading(true);
    
    try {
      const baseUri = import.meta.env.VITE_BASE_URI || 'http://localhost:8000';
      const response = await fetch(`${baseUri}/api/questionnaire/create-or-update-contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          username: data.name,
          phone: data.phone,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact information');
      }

      toast({
        title: "Success",
        description: "Your information has been saved successfully.",
      });

      onSubmit(data);
    } catch (error) {
      console.error('Error submitting contact information:', error);
      toast({
        title: "Error",
        description: "Failed to save your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-secondary/20">
      <Card className="w-full max-w-2xl p-8 md:p-12 animate-fade-in shadow-lg">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Welcome to ATG Tax Planning
            </h1>
            <p className="text-foreground/80">
              Please provide your contact information to get started with your personalized tax planning questionnaire.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full md:w-auto md:px-12"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Continue to Questionnaire"}
                </Button>
              </div>
            </form>
          </Form>

          <p className="text-sm text-muted-foreground pt-4">
            Your information is secure and will only be used by <strong>ATG – Advanced Tax Group</strong> to provide you with personalized tax planning advice.
          </p>
        </div>
      </Card>
    </div>
  );
};
