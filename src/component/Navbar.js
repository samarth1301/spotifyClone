import { Fragment, useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { AiOutlineMenuUnfold, AiOutlineMenuFold, AiOutlineClose } from "react-icons/ai"
import { FaUserCircle } from "react-icons/fa"
import { BsSpotify } from "react-icons/bs"

import { UserContext } from '../context/User'
import { PlaylistContext } from '../context/Playlist'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const [trend, settrend] = useState("")
    const [play, setplay] = useState("")
    const history= useHistory();
   const {loggedIn,setLoggedIn, user} = useContext(UserContext);
   const {playlistType, setPlaylistType} = useContext(PlaylistContext);
   
   const handleFeatured=()=>{
       setPlaylistType("featured");
   }
   const handleMyPlaylist=()=>{
       setPlaylistType("my");
   }

    const handleLogOut=()=>{
        localStorage.clear();
        setLoggedIn(false);
        history.push("/");
    }


    const isloggedIn = true
    return (
        <Disclosure as="nav" className="bg-black py-2">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <AiOutlineMenuFold className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                            <AiOutlineMenuUnfold className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <Link to="/callback" >
                                    <div className="flex-shrink-0 flex items-center">
                                    <div className="md:hidden flex flex-col bg-black w-max items-center justify-center  rounded-md p-1">
                                            <BsSpotify className=" text-green-400 w-6 h-6 " />
                                            <p className="text-semibold text-white no-underline">Spotify</p>
                                        </div>
                                        <div className="md:flex hidden flex-col bg-black w-max items-center justify-center  rounded-md p-1">
                                            <BsSpotify className=" text-green-400 w-6 h-6 " />
                                            <p className="text-semibold text-white no-underline">Spotify</p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex items-center" >
                                <button className={`hidden no-underline sm:block sm:ml-6 items- mt-2 text-white font-semibold h-8 px-2 py-1 rounded-sm bg-${trend}`} onClick={handleFeatured}>
                                    Trending
                             </button>
                                { <button className={`hidden no-underline sm:block sm:ml-6 items-center mt-2 text-white font-semibold bg-${play}`} onClick={handleMyPlaylist} >Your Playlist </button>}
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                </button>
                                {/* Profile dropdown */}
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">Open user menu</span>
                                            <FaUserCircle className="w-8 h-8 text-white" />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                           
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                    onClick={handleLogOut}
                                                       
                                                        className={classNames(active ? 'bg-gray-100' : '', 'no-underline block px-4 py-2 text-sm text-gray-700 w-full')}>
                                                        Sign out
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden py-2">
                        <div>
                            <h2 className="m-2 text-xl font-bold text-white" >
                                Hi {user.email}
                            </h2>
                        </div>
                        <hr/>
                        <div className="m-2 text-lg outline-none">
                            <Disclosure.Button>
                                <button onClick={handleFeatured}  className="text-white">Trending Playlists</button>
                            </Disclosure.Button>
                        </div>
                        <hr/>
                        <div className="m-2 text-lg outline-none">
                            <Disclosure.Button>
                                 <button onClick={handleMyPlaylist} className="text-white">Your Playlists</button>
                            </Disclosure.Button>
                        </div>
                        <hr/>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}