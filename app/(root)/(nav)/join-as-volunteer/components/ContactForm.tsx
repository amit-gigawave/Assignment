"use client";

import { useForm } from "react-hook-form";
import { Clock, Mail, Phone, Loader2 } from "lucide-react";
import CustomInput from "@/components/custom/CustomInputs";
import { CustomButton } from "@/components/custom/CustomButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { VolunteerSchema } from "@/models/schema";
import { VolunteerType } from "@/models/schema";
import { volunteerRequestMutation } from "@/services/query/volunteer";
import { toast } from "sonner";

export default function ContactForm() {
  const form = useForm<VolunteerType>({
    resolver: zodResolver(VolunteerSchema),
  });

  const onSuccess = () => {
    form.reset();
    toast.success("Volunteer request submitted successfully!");
  };

  const { mutate, isPending } = volunteerRequestMutation(onSuccess);
  const handleSubmit = async (data: VolunteerType) => mutate(data);

  return (
    <div className="flex flex-col sm:flex-row gap-6 w-full rounded-xl overflow-hidden mx-auto bg-white">
      <div className="w-full sm:w-[400px] bg-black text-white p-8 flex flex-col justify-between">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold leading-10 ">
            Help and join us
            <br />
            with your Seva.
          </h2>
          <p className="text-gray-400 text-sm italic">
            Service to humanity is service to God, Dedicate your free time to
            help us and others - this is your Daana-Karma.
          </p>
        </div>

        <div className="space-y-4 ">
          <div className="flex items-center gap-3">
            <Phone size={20} className="text-[#ff6b00]" />
            <a href="tel:8712303579" className="text-sm">
              +91 8712303579
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-[#ff6b00]" />
            <span className="text-sm">dhanakarma@email.net</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-[#ff6b00]" />
            <span className="text-sm">Mon-Fri: 8:00am - 6:00pm</span>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form
          className="space-y-6 w-full p-6"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              control={form.control}
              name="firstName"
              label="First Name"
              placeholder="First Name"
            />
            <CustomInput
              control={form.control}
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomInput
              control={form.control}
              name="email"
              label="Email Address"
              placeholder="Email Address"
              type="email"
            />
            <CustomInput
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="Phone Number"
              type="tel"
            />
          </div>
          <CustomInput
            control={form.control}
            name="about"
            label="About"
            placeholder="Tell us about yourself"
            showTextArea
          />
          <CustomButton
            type="submit"
            btnVariant={isPending ? "outlined" : "default"}
            disabled={isPending}
            className="text-base px-8 mx-auto "
          >
            {isPending ? (
              <Loader2 size="sm" className="mr-2 animate-spin" />
            ) : (
              <>Send Request</>
            )}
          </CustomButton>
        </form>
      </Form>
    </div>
  );
}
