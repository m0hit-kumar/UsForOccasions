
// step 1: create room usinf the id given and return room ids  :input:ids of participants nad Output be room ids of particpants
// step 2: send images to the particpants with msg take message and send and return succes our od faluires: input: images and room ids and outout success message
import { AxiosRequestConfig } from 'axios';
import { makeRequest } from './axios-setup';
import { useEffect, useState } from 'react';



const  SendTicketToParticipant:any = async (roomId: string, image: string, msg: string) => {
    const [accessToken, setAcessToken] = useState<string>();

    // useEffect(() => {
    //     const accessTokenValue = localStorage.getItem('accessToken');

    //     if (typeof accessTokenValue === 'string') {
    //         const acessToken = JSON.parse(accessTokenValue);
    //         if (acessToken) {
    //             setAcessToken(acessToken);
    //         }
    //     }
    // }, []);
    try {
        const url = `https://graph.microsoft.com/v1.0/chats/${roomId}/messages`;
        let requestData: any;
        requestData = {
            body: {
                contentType: "html",
                content: `<div>${msg}<div><div><span><img src=\"../hostedContents/1/{{contentId}}\"></span></div></div></div>`,
            },
            hostedContents: [
                {
                    "@microsoft.graph.temporaryId": "1",
                    contentBytes: image,
                    contentType: "image/png"
                }
            ]
        };

        const config: AxiosRequestConfig = {
            method: 'post',
            url: url,
            data: requestData,
            headers: {
                Authorization: `Bearer ${accessToken}` 
            }
        };
        const responseData = await makeRequest(config);

    }
    catch (error) {
        console.error("Failed");
    }
}

export default SendTicketToParticipant