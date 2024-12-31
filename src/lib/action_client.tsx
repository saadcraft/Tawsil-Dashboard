import { toast } from "react-hot-toast"
import axios from "axios";
import { DateTime } from 'next-auth/providers/kakao';
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type Data = {
    last_name: string;
    first_name: string;
    username: string;
    date_de_naissance: DateTime;
    lieux: string;
    email: string;
    sex: string;
    phone_number_1: string;
    phone_number_2: string;
    pass: string;
    password: string;
}

export async function AddAgent(access: string, Data: Data) {
    const { last_name, first_name, username, email, date_de_naissance, lieux, sex, phone_number_1, phone_number_2, pass, password } = Data

    if (pass != password) {
        throw new Error("Password and confirm password are not the same");
    }

    try {
        const res = await axios.post(`${process.env.SERVER_DOMAIN}/api/v1/users/chef_bureux/agent/create`, { last_name, first_name, username, email, date_de_naissance, lieux, sex, phone_number_1, phone_number_2, password }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`,
            }
        });
        if (res.status === 201) {
            return 'Agent added successfully';
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message);
        } else {
            throw new Error('Unexpected response from the server');
        }
    }
}

export async function SubmitCommande({access, id } : {access:string , id : number[]}){

    try {

        const response = await axios.post(`${process.env.SERVER_DOMAIN}/api/v1/user/commandes/valider`, { id } , {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`
            }
        })

        if(response){
            return response;
        }
        
    }catch(error){
        throw error
    }

}


export async function CloseCasses({access, prix } : {access: string , prix : string}) {

    try{
        const response = await axios.post(`${process.env.SERVER_DOMAIN}/api/v1/chefbureux/arretcasse`, { prix }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`
            }
        })
        if (response.status === 200) {
            return true; // Success
          } else {
            return false; // Handle specific cases if needed
          }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 408) {
                throw new Error("Caisse et vide");
            }else{
                throw new Error("Network error");
            } 
        }


}
export async function OpenCasses({access} : {access : string}) {

    try {
        const response = await axios.patch(`${process.env.SERVER_DOMAIN}/api/v1/cassie/chef/ouvrir`,{},{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${access}`
            }
        })
        if (response) {
            return true; // Indicate success
          }
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 400) {
            return false; // Specific error (e.g., already opened)
          } else {
            throw new Error("Network error"); // Unexpected error
          }
    }

    
}