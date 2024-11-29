'use client'

import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Input, 
  Textarea, 
  IconButton, 
  VStack, 
  Heading, 
  Flex, 
  Text, 
  Image, 
  useColorModeValue 
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { FaRegImage, FaHeart, FaStar, FaComment } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
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
      image: '/farmer1.jpg', // Add image for the post
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
      image: '/cabbage.jpg', // Add image for the post
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
      image: '/beanss.jpg', // Add image for the post
      likes: 0,
      favorites: 0,
      comments: [],
    },
  ]);
  const [newPost, setNewPost] = useState('');
  const [postImage, setPostImage] = useState(null);

  // Colors based on mode
  const bgColor = useColorModeValue('white', 'black');
  const textColor = useColorModeValue('black', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');

  // Initialize navigate hook
  const navigate = useNavigate();

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const currentDate = new Date();
      const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
      const newPostData = {
        text: newPost,
        id: Date.now(),
        userName: "Current User", // Replace with dynamic user name
        datePosted: formattedDate,
        profilePic: '/profile-pic.jpg',
        image: postImage,
        likes: 0,
        favorites: 0,
        comments: [],
      };
      setPosts([newPostData, ...posts]);
      setNewPost('');
      setPostImage(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageIconClick = () => {
    document.getElementById("file-input").click();
  };

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
    <Flex minH="100vh" bg={bgColor} color={textColor}>
      {/* Sidebar */}
      <Box width={{ base: 'full', md: '250px' }} bg={bgColor} flexShrink={0}>
        <SidebarWithHeader />
      </Box>

      {/* Main content */}
      <Box flex="1" p={4} overflowY="auto">
        <VStack align="center" spacing={8} maxW="800px" mx="auto" p={8}>       

          <Heading textAlign="center" fontWeight="bold" color={textColor}>
            Farmers' Feed
          </Heading>

          {/* Post Input Area */}
          <Flex w="full" direction="column" align="center">
            <Textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="I'm promoting sustainable agriculture by..."
              size="lg"
              bg={bgColor}
              borderColor={secondaryTextColor}
              color={textColor}
              mb={4}
              rows={5}
            />
            <Input
              type="file"
              accept="image/*"
              id="file-input"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <IconButton
              icon={<FaRegImage />}
              aria-label="Upload Image"
              colorScheme="gray"
              borderRadius="full"
              onClick={handleImageIconClick}
              mb={4}
            />
            {postImage && (
              <Box mb={4}>
                <Image src={postImage} alt="Post Image" boxSize="200px" objectFit="cover" />
              </Box>
            )}
            <Button
              colorScheme="gray"
              variant="solid"
              onClick={handlePostSubmit}
              w="full"
              borderRadius="md"
            >
              Post
            </Button>
          </Flex>

          {/* Displaying posts */}
          <VStack w="full" spacing={4}>
            {posts.map((post) => (
              <Box key={post.id} w="full" p={4} borderWidth="1px" borderRadius="md" bg={bgColor} boxShadow="md">
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
                  <Text fontWeight="bold" color={textColor}>{post.userName}</Text>
                  <Text fontSize="sm" color={secondaryTextColor} ml={2}>{post.datePosted}</Text>
                </Flex>
                <Text color={textColor}>{post.text}</Text>
                {post.image && (
                  <Box mt={2}>
                    <Image src={post.image} alt="Post Image" boxSize="100%" objectFit="cover" />
                  </Box>
                )}
                <Flex justify="space-between" mt={4}>
                  <Button leftIcon={<FaHeart />} onClick={() => handleLike(post.id)} colorScheme="gray" variant="ghost">
                    {post.likes} Likes
                  </Button>
                  <Button leftIcon={<FaStar />} onClick={() => handleFavorite(post.id)} colorScheme="gray" variant="ghost">
                    {post.favorites} Favorites
                  </Button>
                  <Button leftIcon={<FaComment />} onClick={() => handleComment(post.id)} colorScheme="gray" variant="ghost">
                    {post.comments.length} Comments
                  </Button>
                </Flex>
              </Box>
            ))}
          </VStack>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Explore;
