"use client"

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import {
    MdKeyboardArrowUp,
    MdLogin,
    MdContactSupport,
    MdOutlineDashboard,
    MdOutlinePendingActions,
    MdAttachMoney,
    MdOutlineAdminPanelSettings,
    MdDeliveryDining,
    MdLocalTaxi,
    MdOutlineStorefront,
    MdOutlineReport
} from "react-icons/md";
import { GrValidate, GrUserWorker } from "react-icons/gr";
import Image from 'next/image';
import Link from 'next/link';
import { SignOut } from '@/lib/auth';
import { toast } from "react-hot-toast";
import { MenuParams } from "./params";

type props = {
    user: Users
}

export default function Menu({ user }: props) {

    const router = useRouter();

    const [isFaqOpen, setIsFaqOpen] = useState(Array(4).fill(false));
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenu = () => setIsMenuOpen(!isMenuOpen);

    function handleClick(index: number) {
        setIsFaqOpen((prevExpanded) => prevExpanded.map((isExpanded, i) => (i === index ? !isExpanded : isExpanded))
        );
    }
    const handleSubmit = async () => {

        const loadingToastId = toast.loading('Logging Out...');
        try {
            const result = await SignOut();

            if (result) {
                toast.success('Succesfull Logging Out', { id: loadingToastId });
                router.push('/');
            }

        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message, { id: loadingToastId });
            } else {
                toast.error('An unknown error occurred', { id: loadingToastId });
            }
        }

    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 760) {
                setIsMenuOpen(false);
            } else {
                setIsMenuOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);

        // Initial check
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div onClick={handleMenu} className={`fixed z-50 top-6 left-3 transition-all ${isMenuOpen ? "translate-x-64" : ""} flex flex-col justify-center gap-y-2 w-10 h-9 cursor-pointer md:hidden`}>
                <div className={`relative w-full h-1.5 bg-third transition-all duration-500 ${isMenuOpen ? 'top-3.5 -rotate-45' : ''} `}></div>
                <div className={`w-full h-1.5 bg-third transition-all duration-500 ${isMenuOpen ? ' -rotate-45' : ''} `}></div>
                <div className={`relative w-full h-1.5 bg-third transition-all duration-500 ${isMenuOpen ? '-top-3.5  rotate-45' : ''} `}></div>
            </div>
            <div className={`fixed z-40 text-white top-0 overflow-y-auto md:overflow-y-hidden left-0 bottom-0 transition-all md:-translate-x-0  ${isMenuOpen ? "" : "-translate-x-80"}  bg-primer w-80 px-5`}>
                <Link onClick={handleMenu} href="/" className='flex flex-col justify-center'>
                    <Image height={100} width={100} src="/tawsil-start.png" alt="Tawsil" className='w-40 cursor-pointer mx-auto' />
                </Link>

                <div className='flex flex-col gap-2 py-3'>
                    {user &&
                        <>
                            <MenuParams url="/dashboard" title='Dashboard' icon={<MdOutlineDashboard />} onEvent={handleMenu} />
                            {user.role == "chef_bureau" || user.role == "agent_administratif" ?
                                <>
                                    <MenuParams url="/dashboard/deliveries" title='livraisons' icon={<MdDeliveryDining />} onEvent={handleMenu} />
                                    {user.role == "chef_bureau" &&
                                        <>
                                            <MenuParams url="/dashboard/actions" title='Les Action' icon={<MdOutlinePendingActions />} onEvent={handleMenu} />
                                            <MenuParams url="/dashboard/caisses" title='Les caisses' icon={<MdAttachMoney />} onEvent={handleMenu} />

                                            <div onClick={() => handleClick(1)} className='flex justify-between p-3 items-center font-bold hover:bg-slate-600 text-xl cursor-pointer'>
                                                <h1 className='flex items-center gap-2'><MdOutlineAdminPanelSettings /> Agent administratif</h1>
                                                <MdKeyboardArrowUp className={`${isFaqOpen[1] ? 'rotate-180' : ''}`} />
                                            </div>
                                            <div className={`transition-all duration-200 overflow-hidden ${isFaqOpen[1] ? 'max-h-screen' : 'max-h-0'}`}>
                                                <ul className='flex flex-col gap-2 p-3 ml-5'>
                                                    <li className='flex items-center text-slate-400 hover:text-slate-200 text-lg font-semibold gap-2'><Link onClick={handleMenu} href="/dashboard/ajoute_agent"> Ajouté Agent</Link></li>
                                                </ul>
                                                <ul className='flex flex-col gap-2 p-3 ml-5'>
                                                    <li className='flex items-center text-slate-400 hover:text-slate-200 text-lg font-semibold gap-2'><Link onClick={handleMenu} href="/dashboard/agent_administratif"> List Agent</Link></li>
                                                </ul>
                                            </div>
                                        </>
                                    }
                                </> : ""
                            }
                            {
                                user.role == "gestion_commercial" &&
                                <>
                                    <MenuParams url="/dashboard/partenaire" title={`Partenaire`} icon={<MdLocalTaxi />} onEvent={handleMenu} />
                                    <MenuParams url="/dashboard/magasin" title={`Magasin`} icon={<MdOutlineStorefront />} onEvent={handleMenu} />
                                    <MenuParams url="/dashboard/agent_administratif" title={`Agent administratif`} icon={<GrUserWorker />} onEvent={handleMenu} />

                                    <div onClick={() => handleClick(2)} className='flex justify-between p-3 items-center font-bold hover:bg-slate-600 text-xl cursor-pointer'>
                                        <h1 className='flex items-center gap-2'><MdOutlineAdminPanelSettings /> Superviseur</h1>
                                        <MdKeyboardArrowUp className={`${isFaqOpen[2] ? 'rotate-180' : ''}`} />
                                    </div>
                                    <div className={`transition-all duration-200 overflow-hidden ${isFaqOpen[2] ? 'max-h-screen' : 'max-h-0'}`}>
                                        <ul className='flex flex-col gap-2 p-3 ml-5'>
                                            <li className='flex items-center text-slate-400 hover:text-slate-200 text-lg font-semibold gap-2'><Link onClick={handleMenu} href="/dashboard/ajoute_superviseur"> Créer</Link></li>
                                        </ul>
                                        <ul className='flex flex-col gap-2 p-3 ml-5'>
                                            <li className='flex items-center text-slate-400 hover:text-slate-200 text-lg font-semibold gap-2'><Link onClick={handleMenu} href="/dashboard/modifie_superviseur"> Modifié</Link></li>
                                        </ul>
                                    </div>
                                </>
                            }
                            {user.role == "chef_bureau" || user.role == "centre_appel" || user.role == "agent_administratif" ?
                                <MenuParams url="/dashboard/apple_center" title={`Center d'apple`} icon={<MdContactSupport />} onEvent={handleMenu} /> : ""
                            }
                            {user.role == "superviseur" &&
                                <>
                                    <MenuParams url="/dashboard/validation" title={`Validation`} icon={<GrValidate />} onEvent={handleMenu} />
                                    <MenuParams url="/dashboard/rapports" title={`Rapports`} icon={<MdOutlineReport />} onEvent={handleMenu} />
                                </>
                            }
                            {user.role == "validation_vtc" &&
                                <>
                                    <MenuParams url="/dashboard/courses" title={`VTC`} icon={<MdLocalTaxi />} onEvent={handleMenu} />
                                </>
                            }
                        </>}
                    <div onClick={() => handleClick(0)} className='flex justify-between p-3 items-center font-bold hover:bg-slate-600 text-xl cursor-pointer'>
                        <h1 className='flex items-center gap-2'><MdLogin /> Authentication</h1>
                        <MdKeyboardArrowUp className={`${isFaqOpen[0] ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`transition-all duration-200 overflow-hidden ${isFaqOpen[0] ? 'max-h-screen' : 'max-h-0'}`}>
                        <ul className='flex flex-col gap-2 p-3 ml-5'>
                            {user ? <li className='flex items-center text-slate-400 hover:text-slate-200 text-lg font-semibold gap-2'><span onClick={handleSubmit} className='cursor-pointer'> Log Out</span></li> : <li className='flex items-center text-slate-400 hover:text-slate-200 text-lg font-semibold gap-2'><Link onClick={handleMenu} href="/login"> Login</Link></li>}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
