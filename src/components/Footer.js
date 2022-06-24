import { AiFillGithub } from "react-icons/ai";

export const Footer = () => {

    return (
        <footer className=" py-5 px-2   bg-inherit flex   justify-center items-center">
            <p>Made by 
                <a className="hover:text-white ease-in-out transition-all duration-500" href="https://github.com/prxncxss03" target="_blank" rel="noopener noreferrer"> Princess Pocon <AiFillGithub  className="inline-flex"></AiFillGithub></a></p>
        </footer>
    )
}