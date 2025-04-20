"use client"

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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
    MdOutlineReport,
    MdOutlineRequestQuote,
    MdOutlineShoppingBasket,
    MdGroup,
    MdVideoSettings
} from "react-icons/md";
import { TbRecharging } from "react-icons/tb";
import { GrValidate, GrUserWorker } from "react-icons/gr";
import Image from 'next/image';
import { SignOut } from '@/lib/auth';
import { toast } from "react-hot-toast";
import { MenuParams } from "./params";
import LoadingFirst from '../loading';
import { getTotalDemande, getTotalNoGroup } from '@/lib/action_client';

type props = {
    user: Users;
    token: string;
}

export default function Menu({ user, token }: props) {

    const router = useRouter();
    const pathname = usePathname();
    const search = useSearchParams();

    const [isFaqOpen, setIsFaqOpen] = useState(Array(4).fill(false));
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [countState, setCountState] = useState<number | null>(null);
    const [countPart, setCountPart] = useState<number | null>(null);

    const handleMenu = (url: string | null) => {
        setIsMenuOpen(!isMenuOpen);
        if (url === pathname && search.size === 0 || url == null) {
            // If the clicked link is the same as the current path, do nothing
            return;
        }
        setIsLoading(true); // Set loading state only if the path is different
        if (url != null) router.push(url);
    }

    useEffect(() => {
        setIsLoading(false)
    }, [pathname, search])



    useEffect(() => {
        if (!token || (user?.role !== "validation_vtc" && user?.role !== "centre_appel")) {
            setCountState(null);
            setCountPart(null);
            return;
        }
        // Fetch fresh count data when pathname changes
        const fetchCount = async () => {
            try {
                const num = await getTotalDemande(); // Fetch fresh count
                setCountState(num); // Update count state
            } catch (error) {
                console.error('Failed to fetch count:', error);
                setCountState(null); // Handle error
            }
        };

        const fetchNoGroup = async () => {
            try {
                const total = await getTotalNoGroup()
                setCountPart(total)
            } catch (error) {
                console.error('Failed to fetch total:', error);
                setCountPart(null)
            }
        }
        if (user?.role === "centre_appel") fetchNoGroup();
        if (user?.role === "validation_vtc") fetchCount(); // Call the function to fetch count on pathname change
    }, [pathname, search, user, token]);


    function handleClick(index: number) {
        setIsFaqOpen((prevExpanded) => prevExpanded.map((isExpanded, i) => (i === index ? !isExpanded : isExpanded))
        );
    }
    const handleSubmit = async () => {

        const loadingToastId = toast.loading('Déconnection...');
        try {
            const result = await SignOut();

            if (result) {
                toast.success('Déconnecter avec succès', { id: loadingToastId });
                router.push('/');
                setIsLoading(true)
            } else {
                toast.success('Probleme avec Déconnection', { id: loadingToastId });
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
            <div onClick={() => handleMenu(null)} className={`fixed z-50 top-6 left-3 transition-all ${isMenuOpen ? "translate-x-64" : ""} flex flex-col justify-center gap-y-2 w-10 h-9 cursor-pointer md:hidden`}>
                <div className={`relative w-full h-1.5 bg-third transition-all duration-500 ${isMenuOpen ? 'top-3.5 -rotate-45' : ''} `}></div>
                <div className={`w-full h-1.5 bg-third transition-all duration-500 ${isMenuOpen ? ' -rotate-45' : ''} `}></div>
                <div className={`relative w-full h-1.5 bg-third transition-all duration-500 ${isMenuOpen ? '-top-3.5  rotate-45' : ''} `}></div>
                {user?.role == "validation_vtc" &&
                    countState && countState != 0 || countPart && countPart != 0
                    ? (<span className='absolute -top-3 -right-3 py-0.5 px-2 text-sm rounded-full text-white font-bold bg-red-600' >{(countState || 0) + (countPart || 0)}</span>) : ""}
            </div>
            <div className={`fixed z-40 text-white top-0 overflow-y-auto no-scrollbar left-0 bottom-0 transition-all md:-translate-x-0  ${isMenuOpen ? "" : "-translate-x-80"} ${user?.type_account === "premium" ? 'bg-gradient-to-r from-gold5 to-gold6' : 'bg-primer'}  w-80 px-5`}>
                <div onClick={() => handleMenu('/')} className='flex flex-col justify-center'>
                    <Image height={100} width={100} src="/tawsil-start.png" alt="Tawsil" className='w-40 cursor-pointer mx-auto' />
                </div>

                <div className='flex flex-col gap-2 py-3'>
                    {user &&
                        <>
                            <MenuParams title='Tableau de bord' icon={<MdOutlineDashboard />} onEvent={() => handleMenu("/dashboard")} />
                            {user.role == "chef_bureau" || user.role == "agent_administratif" ?
                                <>
                                    <MenuParams title='livraisons' icon={<MdDeliveryDining />} onEvent={() => handleMenu("/dashboard/deliveries")} />
                                    <MenuParams title={`Tutorial`} icon={<MdVideoSettings />} onEvent={() => handleMenu("/dashboard/tutorial")} />
                                    {user.role == "chef_bureau" &&
                                        <>
                                            <MenuParams title='Les Action' icon={<MdOutlinePendingActions />} onEvent={() => handleMenu("/dashboard/actions")} />
                                            <MenuParams title='Les caisses' icon={<MdAttachMoney />} onEvent={() => handleMenu("/dashboard/caisses")} />

                                            <div onClick={() => handleClick(1)} className='flex justify-between p-3 items-center font-bold hover:bg-slate-600 text-xl cursor-pointer'>
                                                <h1 className='flex items-center gap-2'><MdOutlineAdminPanelSettings /> Agent administratif</h1>
                                                <MdKeyboardArrowUp className={`${isFaqOpen[1] ? 'rotate-180' : ''}`} />
                                            </div>
                                            <div className={`transition-all duration-200 overflow-hidden ${isFaqOpen[1] ? 'max-h-screen' : 'max-h-0'}`}>
                                                <ul className='flex flex-col gap-2 p-3 ml-5'>
                                                    <li className='flex items-center cursor-pointer text-slate-400 hover:text-slate-200 text-lg font-semibold gap-2'><div onClick={() => handleMenu("/dashboard/ajoute_agent")}> Ajouter agents</div></li>
                                                </ul>
                                                <ul className='flex flex-col gap-2 p-3 ml-5'>
                                                    <li className='flex items-center cursor-pointer text-slate-400 hover:text-slate-200 text-lg font-semibold gap-2'><div onClick={() => handleMenu("/dashboard/agent_administratif")}> Listes d&apos;agents</div></li>
                                                </ul>
                                            </div>
                                        </>
                                    }
                                </> : ""
                            }
                            {
                                user.role == "gestion_commercial" &&
                                <>
                                    <MenuParams title={`Partenaire`} icon={<MdLocalTaxi />} onEvent={() => handleMenu("/dashboard/partenaire")} />
                                    <MenuParams title={`Magasin`} icon={<MdOutlineStorefront />} onEvent={() => handleMenu("/dashboard/magasin")} />
                                    <MenuParams title={`Agent administratif`} icon={<GrUserWorker />} onEvent={() => handleMenu("/dashboard/agent_administratif")} />

                                    <div onClick={() => handleClick(2)} className='flex justify-between p-3 items-center font-bold hover:bg-slate-600 text-xl cursor-pointer'>
                                        <h1 className='flex items-center gap-2'><MdOutlineAdminPanelSettings /> Superviseur</h1>
                                        <MdKeyboardArrowUp className={`${isFaqOpen[2] ? 'rotate-180' : ''}`} />
                                    </div>
                                    <div className={`transition-all duration-200 overflow-hidden ${isFaqOpen[2] ? 'max-h-screen' : 'max-h-0'}`}>
                                        <ul className='flex flex-col gap-2 p-3 ml-5'>
                                            <li className='flex items-center cursor-pointer text-slate-400 hover:text-slate-200 text-lg font-semibold gap-2'><div onClick={() => handleMenu("/dashboard/ajoute_superviseur")}> Créer</div></li>
                                        </ul>
                                        <ul className='flex flex-col gap-2 p-3 ml-5'>
                                            <li className='flex items-center cursor-pointer text-slate-400 hover:text-slate-200 text-lg font-semibold gap-2'><div onClick={() => handleMenu("/dashboard/modifie_superviseur")}> Modifié</div></li>
                                        </ul>
                                    </div>
                                </>
                            }
                            {user.role == "chef_bureau" || user.role == "centre_appel" || user.role == "agent_administratif" ?
                                <>
                                    <div className='relative'>
                                        <MenuParams title={`Center d'apple`} icon={<MdContactSupport />} onEvent={() => handleMenu("/dashboard/apple_center")} />
                                        {countPart && countPart != 0 ? <span className='absolute top-3.5 right-10 py-0.5 px-2 text-sm rounded-full text-white font-bold bg-red-600' >{countPart}</span> : ""}
                                    </div>
                                </>
                                : ""
                            }
                            {user.role == "centre_appel" &&
                                <>
                                    <MenuParams title={`Groupes`} icon={<MdGroup />} onEvent={() => handleMenu("/dashboard/groupes")} />
                                </>
                            }
                            {user.role == "superviseur" &&
                                <>
                                    <MenuParams title={`Validation`} icon={<GrValidate />} onEvent={() => handleMenu("/dashboard/validation")} />
                                    <MenuParams title={`Rapports`} icon={<MdOutlineReport />} onEvent={() => handleMenu("/dashboard/rapports")} />
                                    <MenuParams title={`Recharger`} icon={<TbRecharging />} onEvent={() => handleMenu("/dashboard/recharge")} />
                                </>
                            }
                            {user.role == "validation_vtc" &&
                                <>
                                    {/* <MenuParams title={`VTC`} icon={<MdLocalTaxi />} onEvent={() => handleMenu("/dashboard/courses")} /> */}
                                    <div onClick={() => handleClick(2)} className='flex justify-between p-3 items-center font-bold hover:bg-slate-600 text-xl cursor-pointer'>
                                        <h1 className='flex items-center gap-2'><MdLocalTaxi /> VTC</h1>
                                        <MdKeyboardArrowUp className={`${isFaqOpen[2] ? 'rotate-180' : ''}`} />
                                    </div>
                                    <div className={`transition-all duration-200 overflow-hidden ${isFaqOpen[2] ? 'max-h-screen' : 'max-h-0'}`}>
                                        <ul className='flex flex-col gap-2 p-3 ml-5'>
                                            <li className='flex items-center cursor-pointer text-slate-400 hover:text-slate-200 text-lg font-semibold gap-2'><div onClick={() => handleMenu("/dashboard/courses")}> VTC par détail</div></li>
                                        </ul>
                                        <ul className='flex flex-col gap-2 p-3 ml-5'>
                                            <li className='flex items-center cursor-pointer text-slate-400 hover:text-slate-200 text-lg font-semibold gap-2'><div onClick={() => handleMenu("/dashboard/vtc_rapide")}> VTC par groupe</div></li>
                                        </ul>
                                    </div>
                                    <MenuParams title={`Actions`} icon={<MdOutlinePendingActions />} onEvent={() => handleMenu("/dashboard/center_actions")} />
                                    <div className='relative'>
                                        <MenuParams title={`Demandes`} icon={<MdOutlineRequestQuote />} onEvent={() => handleMenu("/dashboard/demande")} />
                                        {countState && countState != 0 ? <span className='absolute top-3.5 right-10 py-0.5 px-2 text-sm rounded-full text-white font-bold bg-red-600' >{countState}</span> : ""}
                                    </div>
                                </>
                            }
                            {user.role == "comptable" &&
                                <>
                                    <MenuParams title={`Caisses`} icon={<MdAttachMoney />} onEvent={() => handleMenu("/dashboard/comptable")} />
                                    <MenuParams title={`Actions par groupe`} icon={<MdOutlinePendingActions />} onEvent={() => handleMenu("/dashboard/group_actions")} />
                                </>
                            }
                            {
                                user.role == "partener" &&
                                <>
                                    <MenuParams title={`Gestion Produit`} icon={<MdOutlineStorefront />} onEvent={() => handleMenu("/dashboard/product_management")} />
                                    <MenuParams title={`Commandes`} icon={<MdOutlineShoppingBasket />} onEvent={() => handleMenu("/dashboard/commandes")} />
                                </>
                            }
                        </>}
                    <div onClick={() => handleClick(0)} className='flex justify-between p-3 items-center font-bold hover:bg-slate-600 text-xl cursor-pointer'>
                        <h1 className='flex items-center gap-2'><MdLogin /> Authentication</h1>
                        <MdKeyboardArrowUp className={`${isFaqOpen[0] ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`transition-all duration-200 overflow-hidden ${isFaqOpen[0] ? 'max-h-screen' : 'max-h-0'}`}>
                        <ul className='flex flex-col gap-2 p-3 ml-5'>
                            {user ? <li className='flex items-center cursor-pointer text-slate-400 hover:text-slate-200 text-lg font-semibold gap-2'><span onClick={handleSubmit} className='cursor-pointer'> Déconnecter</span></li> : <li className='flex items-center cursor-pointer text-slate-400 hover:text-slate-200 text-lg font-semibold gap-2'><div onClick={() => handleMenu("/login")}>Se connecter</div></li>}
                        </ul>
                    </div>
                </div>
            </div>
            {isMenuOpen && <div onClick={() => handleMenu(null)} className='fixed top-0 left-0 bottom-0 right-0 z-30 bg-slate-600 bg-opacity-50 md:hidden' ></div>}

            {isLoading &&
                <LoadingFirst />
            }
        </>
    )
}
