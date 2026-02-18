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
} from "@chakra-ui/react"; // gebruik gemaakt van chakra componenten 
import { useColorMode } from "../components/ui/color-mode";
import { data } from "../utils/data";

export const RecipeListPage = ({ onSelectRecipe }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const { toggleColorMode, colorMode } = useColorMode(); // dark mode using charka colormode and below button you can swith dark or light


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
        <Center flexDir="column" p={8}>
            <Heading mb={6}>Your Recipe App</Heading>


            <Button onClick={toggleColorMode} mb={6}>
                Switch to {colorMode === "light" ? "Dark" : "Light"}
            </Button>

            <Button onClick={() => setDietFilter("")} mr={2}>
                All
            </Button>

            <Button onClick={() => setDietFilter("Vegan")} mr={2}>
                Vegan
            </Button>

            <Button onClick={() => setDietFilter("Vegetarian")} mr={2}>
                Vegetarian
            </Button>

            <Button onClick={() => setDietFilter("Pescetarian")}>
                Pescetarian
            </Button>

            <Input
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                mb={8}
                maxW="400px"
            />

            {filteredRecipes.map((item) => {
                const recipe = item.recipe;

                return (
                    <Box
                        key={recipe.label}
                        onClick={() => onSelectRecipe(recipe)}
                        cursor="pointer"
                        maxW="400px" //Responsive req.
                        textAlign="center"
                        mb={10}
                    >
                        <VStack spacing={3}>
                            <Heading size="md">{recipe.label}</Heading>

                            <Image
                                src={recipe.image}
                                alt={recipe.label}
                                boxSize="250px"
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
        </Center>
    );
};
