"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { FaRegUser, FaShoppingBag } from "react-icons/fa";
import Named from '@/lib/tools/named';
import Notification from "@/components/windows/notification"
import { useNotificationStore, userInformation } from '@/lib/tools/store/web_socket';
import { toast } from 'react-toastify';



// type Notification = {
//   id: number;
//   client__username: string;
//   magasin__name: string;
//   total_price: string;
//   status: string;
//   client__phone_number_1: string;
//   created_at: string;
// };

export default function Header({ user, token }: { user: Users, token: string }) {

  const [show, setShow] = useState<boolean>(false);

  const { notifications, setNotifications, addNotification, setSocket } = useNotificationStore();

  const { setUser } = userInformation()

  useEffect(() => {
    // Initialize Zustand store with user data
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);


  useEffect(() => {
    if (!token || user.role !== "partener") return; // Ensure token exists before establishing WebSocket connection

    // Create a new WebSocket connection
    const socket = new WebSocket(`${process.env.WS_SERVER}/ws/commandes/magasin/?token=${token}`);
    const audio = new Audio("/notification.mp3");

    setSocket(socket);

    // Handle WebSocket connection open event
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    // Handle WebSocket message event
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log(data)

      if (Array.isArray(data.message)) {
        setNotifications(data.message);
      } else {
        if (data.message?.status === "pending") {
          audio.play();
          toast(`Nouvelle commande reçue`, {
            autoClose: 4000,
            closeButton: true,
          });
        }

        addNotification(data.message);
      }
    };

    // Handle WebSocket error event
    socket.onerror = () => {
      console.log("WebSocket Error");
    };

    // Handle WebSocket close event
    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    // Cleanup when the component unmounts
    return () => {
      socket.close();
      console.log("WebSocket disconnected on cleanup");
    };
  }, [token, addNotification, setSocket, setNotifications]);


  return (
    <header className={`fixed top-0 z-30 w-full bg-white  bg-gradient-to-r ${user?.type_account === "premium" ? "from-gold5 via-gold2 to-gold5" : "from-primer to-second"} shadow-md`}>
      <div className="py-2 px-4 text-white mx-auto flex justify-between items-center">
        <Image src="/tawsil.png" className="w-16 ml-10 cursor-pointer" alt="Tawsil" width={100} height={100} />
        <div className='flex items-center gap-2'>
          {user && user.role === "partener" ?
            <span onClick={() => setShow(true)} className='relative cursor-pointer text-3xl'>
              {notifications.length !== 0 &&
                <p className='absolute rounded-full text-sm bg-red-600 w-5 h-5 text-center -top-1.5 -right-1.5'>{notifications.length}</p>
              }
              <FaShoppingBag />
            </span>
            : ""
          }
          {user ?
            <Link href="/dashboard/profile" className='p-2 rounded-md flex gap-4 items-center'>
              <FaRegUser className='md:text-4xl text-2xl' />
              <span className='flex flex-col md:gap-1.5 text-sm'>
                <p>{user.username}</p>
                <p>{Named(user.role)}</p>
              </span>
            </Link>
            : <Link href="/login" className='px-5 py-2 rounded-md flex gap-2 items-center'><FaRegUser className='text-xl' />Compte</Link>}
        </div>
      </div>
      {show &&
        <div>
          <div onClick={() => setShow(false)} className='absolute w-full h-screen top-0 bottom-0 right-0 left-0'></div>
          <div className='absolute z-40 top-16 p-2 md:right-32'>
            <Notification not={notifications} onsub={setShow} />
          </div>
        </div>
      }
    </header>
  )
}
