"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Title, Text, Button, Stack, Box, Group, TextInput, Select, Badge, Paper, ActionIcon, NumberInput, Modal, Divider, Loader } from '@mantine/core';
import { IconSearch, IconShoppingCart, IconX, IconPlayerPlay, IconPlayerPause, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import PaymentForm from './components/PaymentForm';

interface Beat {
  id: string;
  title: string;
  artist: string;
  genre: string;
  year: string;
  filename: string;
  purchasePrice: number;
  leasePrice: number;
  bpm?: number;
  key?: string;
  duration?: string;
}

interface CartItem extends Beat {
  quantity: number;
  type: 'lease' | 'purchase';
  price: number; // The actual price based on type
}

export default function PurchasePage(): JSX.Element {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [filteredBeats, setFilteredBeats] = useState<Beat[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<Map<string, HTMLAudioElement>>(new Map());

  // Load beats data
  useEffect(() => {
    const loadBeats = async () => {
      try {
        const response = await fetch('/beats.json');
        if (response.ok) {
          const songsData = await response.json();
          const forSaleBeats = songsData
            .filter((song: any) => song.forsale && song.active)
            .map((song: any) => ({
              id: song.id,
              title: song.title,
              artist: song.artist,
              genre: song.genre,
              year: song.year,
              filename: song.filename,
              purchasePrice: 200, // Purchase price
              leasePrice: 50, // Lease price
              bpm: Math.floor(Math.random() * 60) + 80, // Random BPM for demo
              key: ['C', 'D', 'E', 'F', 'G', 'A', 'B'][Math.floor(Math.random() * 7)] + (Math.random() > 0.5 ? 'm' : ''), // Random key
              duration: `${Math.floor(Math.random() * 2) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}` // Random duration
            }));
          setBeats(forSaleBeats);
          setFilteredBeats(forSaleBeats);
        }
      } catch (error) {
        console.error('Failed to load beats:', error);
      }
    };

    loadBeats();
  }, []);

  // Filter beats based on search query and genre
  useEffect(() => {
    let filtered = beats;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(beat => 
        beat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        beat.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        beat.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenre && selectedGenre !== 'All') {
      filtered = filtered.filter(beat => beat.genre === selectedGenre);
    }

    setFilteredBeats(filtered);
  }, [searchQuery, selectedGenre, beats]);

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, [audioElements]);

  // Get available genres
  const availableGenres = ['All', ...new Set(beats.map(beat => beat.genre))];

  // Add to cart
  const addToCart = (beat: Beat, type: 'lease' | 'purchase') => {
    const price = type === 'lease' ? beat.leasePrice : beat.purchasePrice;
    const cartItemId = `${beat.id}-${type}`;
    
    setCart(prev => {
      const existingItem = prev.find(item => item.id === beat.id && item.type === type);
      if (existingItem) {
        return prev.map(item => 
          item.id === beat.id && item.type === type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...beat, quantity: 1, type, price }];
      }
    });
    
    notifications.show({
      title: 'Added to Cart',
      message: `${beat.title} (${type}) has been added to your cart`,
      color: 'blue',
      icon: <IconCheck size={16} />,
    });
  };

  // Remove from cart
  const removeFromCart = (beatId: string, type: 'lease' | 'purchase') => {
    setCart(prev => prev.filter(item => !(item.id === beatId && item.type === type)));
  };

  // Update cart quantity
  const updateCartQuantity = (beatId: string, type: 'lease' | 'purchase', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(beatId, type);
      return;
    }
    
    setCart(prev => 
      prev.map(item => 
        item.id === beatId && item.type === type
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Calculate total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Handle successful payment
  const handlePaymentSuccess = () => {
    setCart([]);
    setIsCheckoutOpen(false);
  };

  // Handle payment cancellation
  const handlePaymentCancel = () => {
    setIsCheckoutOpen(false);
  };

  // Handle beat preview
  const handleBeatPreview = (beat: Beat) => {
    const beatPath = `/beats/${beat.filename}`;
    
    // Stop any currently playing audio
    if (currentlyPlaying && audioElements.has(currentlyPlaying)) {
      const currentAudio = audioElements.get(currentlyPlaying);
      currentAudio?.pause();
      currentAudio!.currentTime = 0;
    }

    // If clicking the same beat that's playing, just stop it
    if (currentlyPlaying === beat.id) {
      setCurrentlyPlaying(null);
      return;
    }

    // Get or create audio element for this beat
    let audio = audioElements.get(beat.id);
    if (!audio) {
      audio = new Audio(beatPath);
      audio.volume = 0.7;
      setAudioElements(prev => new Map(prev.set(beat.id, audio!)));
    }

    // Play the beat preview
    audio.currentTime = 0;
    audio.play().then(() => {
      setCurrentlyPlaying(beat.id);
      
      // Auto-stop after 30 seconds or when audio ends
      const stopPreview = () => {
        setCurrentlyPlaying(null);
        audio!.removeEventListener('ended', stopPreview);
      };
      
      audio!.addEventListener('ended', stopPreview);
      
      // Stop after 30 seconds
      setTimeout(() => {
        if (currentlyPlaying === beat.id) {
          audio!.pause();
          audio!.currentTime = 0;
          setCurrentlyPlaying(null);
        }
      }, 30000);
      
    }).catch(() => {
      notifications.show({
        title: 'Preview Error',
        message: 'Unable to play preview',
        color: 'red',
      });
    });

    notifications.show({
      title: 'Playing Preview',
      message: `${beat.title} - 30 second preview`,
      color: 'blue',
      autoClose: 3000,
    });
  };

  return (
    <main style={{ 
      background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2d2d2d 100%)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url(\'data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.02"><circle cx="30" cy="30" r="1"/></g></g></svg>\')',
          opacity: 0.4,
          zIndex: 0
        }}
      />

      <Box style={{ marginTop: '60px', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <Container size="lg" py="xl">
          <Stack gap="xl">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ width: '100%', textAlign: 'center' }}
            >
              <Title 
                order={1} 
                size="4rem" 
                c="white" 
                fw={700} 
                mb="lg"
                style={{ 
                  lineHeight: 1.1,
                  fontFamily: 'var(--font-poppins), sans-serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  letterSpacing: '-0.04em',
                  textShadow: '0 8px 32px rgba(0,0,0,0.3)'
                }}
              >
                Buy Exclusive Beats
              </Title>
              
              <Text 
                size="xl" 
                c="rgba(255, 255, 255, 0.8)" 
                maw={800} 
                mx="auto"
                style={{ 
                  lineHeight: 1.7,
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '1.25rem',
                  letterSpacing: '0.005em'
                }}
              >
                Professional beats for your next hit. Instant download with exclusive licensing.
              </Text>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Paper
                shadow="xl"
                radius="xl"
                p="xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Stack gap="lg">
                  <Group align="end">
                    {/* Search Bar */}
                    <TextInput
                      placeholder="Search beats by title, artist, or genre..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      leftSection={<IconSearch size={16} />}
                      size="lg"
                      style={{ flex: 1 }}
                      styles={{
                        input: {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          '&::placeholder': {
                            color: 'rgba(255, 255, 255, 0.6)'
                          }
                        }
                      }}
                    />

                    {/* Genre Filter */}
                    <Select
                      placeholder="Filter by genre"
                      value={selectedGenre}
                      onChange={setSelectedGenre}
                      data={availableGenres}
                      size="lg"
                      w={200}
                      styles={{
                        input: {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          color: 'white',
                        },
                        dropdown: {
                          backgroundColor: 'rgba(20, 20, 20, 0.95)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(20px)',
                        },
                        option: {
                          color: 'white',
                          '&[data-selected]': {
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          },
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          }
                        }
                      }}
                    />

                    {/* Cart Button */}
                    <Button
                      leftSection={<IconShoppingCart size={20} />}
                      size="lg"
                      onClick={() => setIsCartOpen(true)}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none',
                        position: 'relative'
                      }}
                    >
                      Cart ({cart.length})
                    </Button>
                  </Group>

                  {/* Results Info */}
                  <Text size="sm" c="rgba(255, 255, 255, 0.6)">
                    {filteredBeats.length} beat{filteredBeats.length !== 1 ? 's' : ''} available
                    {selectedGenre && selectedGenre !== 'All' && ` in ${selectedGenre}`}
                  </Text>
                </Stack>
              </Paper>
            </motion.div>

            {/* Beats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Stack gap="md">
                {filteredBeats.map((beat, index) => (
                  <motion.div
                    key={beat.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Paper
                      p="lg"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                    >
                      <Group justify="space-between" align="center">
                        <Group gap="lg" align="center">
                          {/* Play Button */}
                          <ActionIcon
                            size="xl"
                            variant="filled"
                            style={{
                              background: currentlyPlaying === beat.id 
                                ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              border: 'none',
                            }}
                            onClick={() => handleBeatPreview(beat)}
                          >
                            {currentlyPlaying === beat.id ? (
                              <IconPlayerPause size={20} />
                            ) : (
                              <IconPlayerPlay size={20} />
                            )}
                          </ActionIcon>

                          {/* Beat Info */}
                          <Box>
                            <Text 
                              size="lg" 
                              fw={600} 
                              c="white"
                              style={{ fontFamily: 'var(--font-poppins), sans-serif' }}
                            >
                              {beat.title}
                            </Text>
                            <Text 
                              size="sm" 
                              c="rgba(255, 255, 255, 0.7)"
                              mb={4}
                            >
                              by {beat.artist}
                            </Text>
                            <Group gap="sm">
                              <Badge 
                                size="sm" 
                                variant="outline"
                                style={{
                                  color: 'rgba(255, 255, 255, 0.8)',
                                  borderColor: 'rgba(255, 255, 255, 0.3)'
                                }}
                              >
                                {beat.genre}
                              </Badge>
                              {beat.bpm && (
                                <Badge 
                                  size="sm" 
                                  variant="outline"
                                  style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    borderColor: 'rgba(255, 255, 255, 0.3)'
                                  }}
                                >
                                  {beat.bpm} BPM
                                </Badge>
                              )}
                              {beat.key && (
                                <Badge 
                                  size="sm" 
                                  variant="outline"
                                  style={{
                                    color: 'rgba(255, 255, 255, 0.8)',
                                    borderColor: 'rgba(255, 255, 255, 0.3)'
                                  }}
                                >
                                  {beat.key}
                                </Badge>
                              )}
                            </Group>
                          </Box>
                        </Group>

                        <Group gap="sm">
                          <Button
                            size="md"
                            variant="outline"
                            leftSection={<IconShoppingCart size={16} />}
                            onClick={() => addToCart(beat, 'lease')}
                            style={{
                              borderColor: 'rgba(102, 126, 234, 0.6)',
                              color: 'rgba(102, 126, 234, 1)',
                              '&:hover': {
                                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                              }
                            }}
                          >
                            Lease ${beat.leasePrice}
                          </Button>
                          <Button
                            size="md"
                            leftSection={<IconShoppingCart size={16} />}
                            onClick={() => addToCart(beat, 'purchase')}
                            style={{
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              border: 'none',
                            }}
                          >
                            Buy ${beat.purchasePrice}
                          </Button>
                        </Group>
                      </Group>
                    </Paper>
                  </motion.div>
                ))}
              </Stack>

              {filteredBeats.length === 0 && (
                <Paper
                  p="xl"
                  ta="center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                  }}
                >
                  <Text size="lg" c="rgba(255, 255, 255, 0.6)">
                    No beats found matching your search criteria
                  </Text>
                </Paper>
              )}
            </motion.div>
          </Stack>
        </Container>

        {/* Cart Modal */}
        <Modal
          opened={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          title="Shopping Cart"
          size="lg"
          styles={{
            content: {
              backgroundColor: 'rgba(20, 20, 20, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            },
            header: {
              backgroundColor: 'transparent',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            },
            title: {
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 700,
            },
            close: {
              color: 'white',
            }
          }}
        >
          <Stack gap="md">
            {cart.length === 0 ? (
              <Text ta="center" c="rgba(255, 255, 255, 0.6)" py="xl">
                Your cart is empty
              </Text>
            ) : (
              <>
                {cart.map((item, index) => (
                  <Group key={`${item.id}-${item.type}-${index}`} justify="space-between" align="center" p="md" style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}>
                    <Box>
                      <Group gap="sm" align="center">
                        <Text fw={600} c="white">{item.title}</Text>
                        <Badge 
                          size="sm" 
                          variant={item.type === 'purchase' ? 'filled' : 'outline'}
                          style={{
                            backgroundColor: item.type === 'purchase' 
                              ? 'rgba(34, 197, 94, 0.8)' 
                              : 'transparent',
                            borderColor: item.type === 'purchase' 
                              ? 'rgba(34, 197, 94, 1)' 
                              : 'rgba(102, 126, 234, 0.8)',
                            color: item.type === 'purchase' 
                              ? 'white' 
                              : 'rgba(102, 126, 234, 1)',
                          }}
                        >
                          {item.type === 'purchase' ? 'Buy' : 'Lease'}
                        </Badge>
                      </Group>
                      <Text size="sm" c="rgba(255, 255, 255, 0.7)">by {item.artist}</Text>
                      <Text size="sm" c="rgba(255, 255, 255, 0.8)">${item.price} each</Text>
                    </Box>
                    
                    <Group gap="sm">
                      <NumberInput
                        value={item.quantity}
                        onChange={(value) => updateCartQuantity(item.id, item.type, Number(value) || 0)}
                        min={0}
                        max={10}
                        w={80}
                        styles={{
                          input: {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: 'white',
                          }
                        }}
                      />
                      <ActionIcon
                        color="red"
                        variant="subtle"
                        onClick={() => removeFromCart(item.id, item.type)}
                      >
                        <IconX size={16} />
                      </ActionIcon>
                    </Group>
                  </Group>
                ))}
                
                <Divider style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                
                <Group justify="space-between" align="center">
                  <Text size="xl" fw={700} c="white">
                    Total: ${cartTotal.toFixed(2)}
                  </Text>
                  <Button
                    size="lg"
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    disabled={cart.length === 0}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none',
                    }}
                  >
                    Checkout
                  </Button>
                </Group>
              </>
            )}
          </Stack>
        </Modal>

        {/* Checkout Modal */}
        <Modal
          opened={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          title="Checkout"
          size="md"
          styles={{
            content: {
              backgroundColor: 'rgba(20, 20, 20, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            },
            header: {
              backgroundColor: 'transparent',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            },
            title: {
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 700,
            },
            close: {
              color: 'white',
            }
          }}
        >
          <Stack gap="lg">
            {/* Order Summary */}
            <Box>
              <Text fw={600} c="white" mb="sm">Order Summary</Text>
              {cart.map((item, index) => (
                <Group key={`${item.id}-${item.type}-${index}`} justify="space-between" p="sm" style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  marginBottom: '8px',
                }}>
                  <Box>
                    <Text c="rgba(255, 255, 255, 0.8)">
                      {item.title} x{item.quantity}
                    </Text>
                    <Badge 
                      size="xs" 
                      variant={item.type === 'purchase' ? 'filled' : 'outline'}
                      style={{
                        backgroundColor: item.type === 'purchase' 
                          ? 'rgba(34, 197, 94, 0.8)' 
                          : 'transparent',
                        borderColor: item.type === 'purchase' 
                          ? 'rgba(34, 197, 94, 1)' 
                          : 'rgba(102, 126, 234, 0.8)',
                        color: item.type === 'purchase' 
                          ? 'white' 
                          : 'rgba(102, 126, 234, 1)',
                        marginTop: '4px'
                      }}
                    >
                      {item.type === 'purchase' ? 'Purchase License' : 'Lease License'}
                    </Badge>
                  </Box>
                  <Text c="white">${(item.price * item.quantity).toFixed(2)}</Text>
                </Group>
              ))}
              <Divider my="sm" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
              <Group justify="space-between">
                <Text fw={700} c="white">Total:</Text>
                <Text fw={700} c="white" size="lg">${cartTotal.toFixed(2)}</Text>
              </Group>
            </Box>

            {/* Payment Form */}
            <PaymentForm
              total={cartTotal}
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          </Stack>
        </Modal>
      </Box>
    </main>
  );
}
