"use client"

import { Box, Drawer, Avatar, useMediaQuery, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Facebook,  Globe , Linkedin} from 'lucide-react';

export default function ProfileDrawer({ open, toggleDrawer }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const me =require('./media/me.jpg');

  return (
    <Drawer 
      anchor={isMobile ? "bottom" : "right"} 
      open={open} 
      onClose={toggleDrawer}
      PaperProps={{
        sx: {
          background: "linear-gradient(to left bottom, #fca5a5, #03304a, #b91c1c)",
          color: "white",
        }
      }}
    >
      <Box className="p-6 max-w-md mx-auto">
        <div className="flex flex-col items-center text-center">
          <Link href="https://www.amennoome.com" passHref>
            <Avatar 
              src={me}
              alt="Amen Johnson" 
              sx={{ width: 90, height: 90 }}
              className="w-2/3 h-2/3 mb-2 cursor-pointer"
              
            />
          </Link>
          <Link href="https://www.amennoome.com" passHref>
            <h2 className="text-2xl font-bold mb-1 cursor-pointer hover:underline">Amen Allah Naamen</h2>
          </Link>
          <p className="text-sm text-muted-foreground mb-6">Web Developer & Designer</p>
          <div className="prose prose-sm prose-invert">
            <h2 className="text-lg font-semibold mb-2">Why I developed This application</h2>
            <p className="mb-4">
            This site was created to help movie and TV show enthusiasts discover everything they need to know before choosing what to watch next. Whether you're searching for the latest blockbuster or exploring a new TV series, this platform provides you with ratings, reviews, and detailed information to make informed choices. I built this site to simplify the process of finding content that matches your taste, while offering a seamless browsing experience to explore movies and shows across various genres. </p>
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <div className="flex justify-center space-x-4">
              <Link href="https://www.facebook.com/profile.php?id=61556117758924" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-6 h-6 text-white hover:text-blue-400" />
              </Link>
              
              <Link href="www.amennoomen.com" target="_blank" rel="noopener noreferrer">
                <Globe className="w-6 h-6 text-white hover:text-blue-400" />
              </Link>
              <Link href="https://www.linkedin.com/in/amen-allah-naamen-/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-6 h-6 text-white hover:text-pink-400" />
              </Link>
            </div>
          </div>
        </div>
      </Box>
    </Drawer>
  );
}