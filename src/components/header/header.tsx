"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { FaRegUser, FaShoppingBag } from "react-icons/fa";
import Named from '@/lib/tools/named';
import Notification from "@/components/windows/notification"


type Notification = {
  id: number;
  clientusername: string;
  magasinname: string;
  total_price: string;
  status: string;
  client__phone_number_1: string;
};

export default function Header({ user, token }: { user: Users, token: string }) {

  const [notification, setNotification] = useState<Notification[]>([])
  const [show, setShow] = useState<boolean>(false);


  useEffect(() => {
    if (!token) return; // Ensure token exists before establishing WebSocket connection

    // Create a new WebSocket connection
    const socket = new WebSocket(`ws://192.168.1.30:8000/ws/commandes/magasin/?token=${token}`);
    const audio = new Audio("/notification.wav");

    // Handle WebSocket connection open event
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    // Handle WebSocket message event
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received data:", data);



      if (Array.isArray(data.message)) {
        setNotification(data.message);
      } else {
        setNotification(prevState => {
          // Ensure prevState is always an array
          const currentNotifications = prevState || [];

          // Check if the notification with the same id already exists
          const isExisting = currentNotifications.some(notification => notification?.id === data.message?.id);

          if (isExisting) {
            // Remove notification if it exists
            return currentNotifications.filter(notification => notification.id !== data.message.id);
          } else {
            // Add new notification to the state
            audio.play();
            return [...currentNotifications, data.message];
          }
        });
      }
    };

    // Handle WebSocket error event
    socket.onerror = (error) => {
      console.error("WebSocket Error: ", error);
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
  }, [token]);


  console.log(notification)


  return (
    <header className="fixed top-0 z-30 w-full bg-white  bg-gradient-to-r from-primer to-second shadow-md">
      <div className="py-2 px-4 text-white mx-auto flex justify-between items-center">
        <Image src="/tawsil.png" className="w-16 ml-10 cursor-pointer" alt="Tawsil" width={100} height={100} />
        <div className='flex items-center'>
          <span className='relative cursor-pointer text-3xl'>
            {notification &&
              <p className='absolute rounded-full text-sm bg-red-600 w-5 h-5 text-center -top-1.5 -right-1.5'>{notification.length}</p>
            }
            <FaShoppingBag />
          </span>
          {user ?
            <Link href="/dashboard/profile" className='px-5 py-2 rounded-md flex gap-4 items-center'>
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
          <div className='absolute z-40 top-16 right-32'>
            <Notification />
          </div>
        </div>
      }
    </header>
  )
}
