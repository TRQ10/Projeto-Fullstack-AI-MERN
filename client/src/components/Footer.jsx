import React from 'react'


function Footer() {
    return (
        <>
            <footer className="p-4 bg-[#0F0F0F] border-t-[#fefefe] border-t w-full">
                <div className="flex flex-col md:flex-row justify-evenly gap-2 md:flex md:justify-between my-3">
                    <div className="mb-6 md:mb-0 flex flex-col justify-evenly md:w-[30vw] items-center">
                        <div>
                            <a href="" className="flex items-center">
                                <img src="" className="h-8 mr-3" alt="Logo" />
                            </a>
                        </div>
                        <div class="md:flex md:items-center md:justify-between">
                            <span class="text-sm sm:text-center text-[#fefefe]">
                                © 2023 dAIsy All Rights Reserved.
                            </span>
                        </div>
                    </div>
                    <div className="w-[100vw] md:w-[70vw] flex flex-row flex-wrap justify-evenly">
                        <div className='hidden md:flex md:flex-col md:justify-between md:border-l-white md:border-l p-3'>
                            <h2 className="mb-6 text-sm font-semibold uppercase text-[#fefefe]">About us</h2>
                            <ul className="">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline text-[#fefefe]">
                                        Site Stats
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="hover:underline text-[#fefefe]">
                                        Site Recommendations
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='hidden md:flex md:flex-col md:justify-between md:border-l-white md:border-l p-3'>
                            <h2 class="mb-6 text-sm font-semibold uppercase text-[#fefefe]">Follow us</h2>
                            <ul class="">
                                <li class="mb-4">
                                    <a href="#" class="hover:underline text-[#fefefe] ">
                                        Twitter
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="hover:underline text-[#fefefe]">
                                        Discord
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='hidden md:flex md:flex-col md:justify-between md:border-l-white md:border-l p-3'>
                            <h2 class="mb-6 text-sm font-semibold uppercase text-[#fefefe]">Legal</h2>
                            <ul class="">
                                <li class="mb-4">
                                    <a href="#" class="hover:underline text-[#fefefe]">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="hover:underline text-[#fefefe]">
                                        Terms &amp; Conditions
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer