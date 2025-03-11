import { useMutation } from "@tanstack/react-query"
import {volunteerRequest} from "@/services/api/volunteer"
import { VolunteerType } from "@/models/schema"
import { toast } from "sonner";

export const volunteerRequestMutation = (onSuccess : Function) => {
    return useMutation({
        mutationKey : ["volunteerRequest"],
        mutationFn : async(volunteer : VolunteerType) => volunteerRequest(volunteer),
        onSuccess : () => onSuccess(),
        onError : (error) => {
            console.log("Error");
            toast.error(error.message ?? error.name);
        }
    });
}


