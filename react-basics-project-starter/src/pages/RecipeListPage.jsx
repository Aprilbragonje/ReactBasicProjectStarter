import { useState } from "react";
import {
    Center,
    Heading,
    Input,
    Image,
    Button,
    Box,
    Text,
    VStack,
    SimpleGrid
} from "@chakra-ui/react"; // gebruik gemaakt van chakra componenten 
import { useColorMode } from "../components/ui/color-mode";
import { data } from "../utils/data";


export const RecipeListPage = ({ onSelectRecipe }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const { toggleColorMode, colorMode } = useColorMode(); // dark mode using charka colormode and below button you can swith dark or light

    const bg = colorMode === "light" ? "gray.50" : "gray.900";
    const cardBg = colorMode === "light" ? "white" : "gray.700";

    const [dietFilter, setDietFilter] = useState("");

    const filteredRecipes = data.hits.filter((item) => {
        const recipe = item.recipe;
        const lowerSearch = searchTerm.toLowerCase();

        const matchesSearch =
            recipe.label.toLowerCase().includes(lowerSearch) ||
            recipe.healthLabels.some((label) =>
                label.toLowerCase().includes(lowerSearch)
            );

        const matchesDiet =
            dietFilter === "" ||
            recipe.healthLabels.includes(dietFilter);

        return matchesSearch && matchesDiet;
    });

    return ( //Responsive req. and     /// its mobile-first chakra layout component center, box en vstack 
        <Center flexDir="column" p={8} bg={bg} minH="100vh" overflowX="hidden">
            <Heading mb={6}>Your Recipe App</Heading>

            <Button onClick={toggleColorMode} mb={6}>
                Switch to {colorMode === "light" ? "Dark" : "Light"}
            </Button>

            {/* Filter buttons - actieve categorie blijft zichtbaar */}
            <Box mb={6} display="flex" flexWrap="wrap" gap={2}>
                <Button
                    onClick={() => setDietFilter("")}
                    variant={dietFilter === "" ? "solid" : "outline"}
                    colorScheme="gray"
                >
                    All
                </Button>

                <Button
                    onClick={() => setDietFilter("Vegan")}
                    variant={dietFilter === "Vegan" ? "solid" : "outline"}
                    colorScheme="gray"
                >
                    Vegan
                </Button>

                <Button
                    onClick={() => setDietFilter("Vegetarian")}
                    variant={dietFilter === "Vegetarian" ? "solid" : "outline"}
                    colorScheme="gray"
                >
                    Vegetarian
                </Button>

                <Button
                    onClick={() => setDietFilter("Pescetarian")}
                    variant={dietFilter === "Pescetarian" ? "solid" : "outline"}
                    colorScheme="gray"
                >
                    Pescetarian
                </Button>
            </Box>

            <Input
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                mb={8}
                maxW="400px"
            />

            {filteredRecipes.length === 0 && ( // Melding geen recepten
                <Text mt={4}>No recipes found.</Text>
            )}

            <SimpleGrid //responsive grid voor deskt.   
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={8}
                w="100%"
                maxW="1200px"
            >
                {filteredRecipes.map((item) => {
                    const recipe = item.recipe;

                    return (
                        <Box
                            key={recipe.label}
                            onClick={() => onSelectRecipe(recipe)}
                            cursor="pointer"
                            w="100%"
                            bg={cardBg}
                            p={4}
                            borderRadius="lg"
                            boxShadow="md"
                            _hover={{ transform: "scale(1.02)" }}
                            transition="0.2s"
                        >
                            <VStack spacing={3}>
                                <Heading size="md">{recipe.label}</Heading>

                                <Image  //responsive image fix geen horizontale scroll 
                                    src={recipe.image}
                                    alt={recipe.label}
                                    w="100%"
                                    maxW="250px"
                                    objectFit="cover"
                                    borderRadius="md"
                                />

                                {recipe.dietLabels.length > 0 && (
                                    <Text>
                                        <strong>Diet:</strong> {recipe.dietLabels.join(", ")}
                                    </Text>
                                )}

                                {recipe.cautions.length > 0 && (
                                    <Text>
                                        <strong>Cautions:</strong> {recipe.cautions.join(", ")}
                                    </Text>
                                )}

                                {recipe.mealType && (
                                    <Text>
                                        <strong>Meal type:</strong> {recipe.mealType.join(", ")}
                                    </Text>
                                )}

                                {recipe.dishType && (
                                    <Text>
                                        <strong>Dish type:</strong> {recipe.dishType.join(", ")}
                                    </Text>
                                )}

                                {recipe.healthLabels.includes("Vegan") && (
                                    <Text>🌱 Vegan</Text>
                                )}

                                {recipe.healthLabels.includes("Vegetarian") && (
                                    <Text>🥦 Vegetarian</Text>
                                )}
                            </VStack>
                        </Box>
                    );
                })}
            </SimpleGrid>
        </Center>
    );
};