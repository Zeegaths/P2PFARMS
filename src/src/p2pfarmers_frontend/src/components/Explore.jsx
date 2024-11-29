'use client'

import React, { useState } from 'react';
import { Box, Button, Input, Textarea, IconButton, VStack, Heading, Flex, Text, Image } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';  
import { FaRegImage, FaHeart, FaStar, FaComment } from "react-icons/fa"; // Import icons for like, favorite, and comment
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import SidebarWithHeader from '../Sidebar';
import '../index.css';

const Explore = () => {
  const [posts, setPosts] = useState([
    // Boilerplate posts for demonstration
    {
      text: "Practicing crop rotation to preserve soil health. Sustainable farming practices like this help in maintaining long-term productivity!",
      id: 1,
      userName: "Farmer John",
      datePosted: "2024-11-15 14:00",
      profilePic: '/farmer1.jpg',
      image: '/farmer1.jpg',  // Add image for the post
      likes: 0,
      favorites: 0,
      comments: [],
    },
    {
      text: "Implementing drip irrigation to conserve water usage. Every drop counts when it comes to farming sustainably!",
      id: 2,
      userName: "Farmer Emily",
      datePosted: "2024-11-14 09:00",
      profilePic: '/farmer2.jpg',
      image: '/cabbage.jpg',  // Add image for the post
      likes: 0,
      favorites: 0,
      comments: [],
    },
    {
      text: "Organic fertilizers over chemical alternatives for better soil health. Sustainable practices like these ensure healthy crops for years to come!",
      id: 3,
      userName: "Farmer Mike",
      datePosted: "2024-11-12 18:30",
      profilePic: '/farmer3.jpeg',
      image: '/beanss.jpg',  // Add image for the post
      likes: 0,
      favorites: 0,
      comments: [],
    }
  ]);
  const [newPost, setNewPost] = useState('');
  const [postImage, setPostImage] = useState(null);

  // Initialize navigate hook
  const navigate = useNavigate();

  // Handle post submission
  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
      const newPostData = {
        text: newPost,
        id: Date.now(),
        userName: "Current User", // Replace with dynamic user name
        datePosted: formattedDate,
        profilePic: '/profile-pic.jpg', // Replace with dynamic profile picture if needed
        image: postImage,  // Attach the uploaded image
        likes: 0,  // Initialize likes to 0
        favorites: 0,  // Initialize favorites to 0
        comments: [],  // Initialize comments as empty array
      };
      setPosts([newPostData, ...posts]);
      setNewPost('');
      setPostImage(null); // Clear the uploaded image after posting
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result); // Save the base64 image data
      };
      reader.readAsDataURL(file); // Convert the image to base64 string
    }
  };

  // Trigger the file input on icon click
  const handleImageIconClick = () => {
    document.getElementById("file-input").click(); // Simulate the click on file input
  };

  // Handle Like, Favorite, and Comment
  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleFavorite = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, favorites: post.favorites + 1 } : post
    ));
  };

  const handleComment = (postId) => {
    const commentText = prompt("Enter your comment:");
    if (commentText) {
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, comments: [...post.comments, commentText] } : post
      ));
    }
  };

  return (
    <Flex minH="10vh" bg="rgba(0,255,0,0.1)" backdropFilter="blur(10px)"> {/* Full screen height */}   
      {/* Sidebar */}
      <Box width={{ base: 'full', md: '0px' }} bg="rgba(0, 0, 0, 0.1)" flexShrink={0}>
        <SidebarWithHeader />
      </Box>

      {/* Main content */}
      <Box flex="1" p={4} overflowY="auto">
        <VStack
          align="center"          
          spacing={8}
          maxW="800px"
          mx="auto"
          p={8}
          borderRadius="lg"
          boxShadow="md"
        >
          {/* Back Button */}
          <IconButton
            icon={<AddIcon />} 
            aria-label="Go back"
            onClick={() => navigate(-1)}  // Go back to the previous page
            colorScheme="green"
            borderRadius="full"
            mb={4}
          />

          <Heading textAlign="center" fontWeight="bold" color="green.400">
            Farmers' Feed
          </Heading>

          {/* Post Input Area */}
          <Flex w="full" direction="column" align="center" justify="center">
            <Textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="I'm promoting sustainable agriculture by..,"
              size="lg"
              bg="black"
              borderColor="green.500"
              borderRadius="md"
              _focus={{ borderColor: 'green.300' }}
              mb={4}
              rows={5}
            />
            {/* Image Upload Section */}
            <Input
              type="file"
              accept="image/*"
              id="file-input"
              style={{ display: 'none' }}  // Hide the file input field
              onChange={handleImageChange}
            />
            <IconButton
              icon={<FaRegImage />}
              aria-label="Upload Image"
              colorScheme="green"
              borderRadius="full"
              onClick={handleImageIconClick}  // Trigger file input on icon click
              mb={4}
              size="lg"
            />
            {postImage && (
              <Box mb={4}>
                <Image src={postImage} alt="Post Image" boxSize="200px" objectFit="cover" />
              </Box>
            )}
            <Button
              colorScheme="green"
              variant="solid"
              onClick={handlePostSubmit}
              w="full"
              borderRadius="md"
              bg="green.400"
              _hover={{ bg: 'green.500' }}
            >
              Post
            </Button>
          </Flex>

          {/* Displaying posts */}
          <VStack w="full" spacing={4}>
            {posts.map((post) => (
              <Box key={post.id} w="full" p={4} borderWidth="1px" borderRadius="md" bg="black" boxShadow="md">
                <Flex align="center" mb={2}>
                  <Box 
                    bgImage={`url(${post.profilePic})`}
                    bgSize="cover"
                    bgPosition="center"
                    w="30px"
                    h="30px"
                    borderRadius="full"
                    mr={3}
                  />
                  <Text fontWeight="bold" color="green.500">{post.userName}</Text>
                  <Text fontSize="sm" color="gray.500" ml={2}>{post.datePosted}</Text>
                </Flex>
                <Text color="white" fontSize="md">{post.text}</Text>
                {post.image && (
                  <Box mt={2}>
                    <Image src={post.image} alt="Post Image" boxSize="100%" objectFit="cover" />
                  </Box>
                )}
                <Flex justify="space-between" mt={4}>
                  <Button leftIcon={<FaHeart />} onClick={() => handleLike(post.id)} colorScheme="red" variant="ghost">
                    {post.likes} Likes
                  </Button>
                  <Button leftIcon={<FaStar />} onClick={() => handleFavorite(post.id)} colorScheme="yellow" variant="ghost">
                    {post.favorites} Favorites
                  </Button>
                  <Button leftIcon={<FaComment />} onClick={() => handleComment(post.id)} colorScheme="blue" variant="ghost">
                    {post.comments.length} Comments
                  </Button>
                </Flex>
              </Box>
            ))}
          </VStack>

      {/* Add Post Button */}
      <IconButton
        icon={<AddIcon />}
        colorScheme="green"
        borderRadius="full"
        size="lg"  // Make the button smaller by changing the size to "md"
        aria-label="Add Post"
        onClick={() => setNewPost('')}
        position="fixed"
        bottom="20px"
        left="50%"  // Center the button horizontally
        transform="translateX(-50%)"  // Adjust positioning to center it
        boxShadow="lg"
        bg="green.500"
        _hover={{ bg: 'green.600' }}
      />

        </VStack>
      </Box>
    </Flex>
  );
};

export default Explore;
