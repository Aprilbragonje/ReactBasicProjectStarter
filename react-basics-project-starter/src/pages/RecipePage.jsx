import { useEffect } from "react";
import {
    Box,
    Button,
    Heading,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";  //chakra req.

export const RecipePage = ({ recipe, onBack }) => {
    if (!recipe) return null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {
        label,
        image,
        mealType,
        dishType,
        totalTime,
        dietLabels,
        healthLabels,
        cautions,
        ingredientLines,
        yield: servings,
        totalNutrients,
    } = recipe;

    /// its mobile-first chakra layout component center, box en vstack 

    return (  //responsive req
        <Box p={10} maxW="800px" mx="auto">
            <Button mb={6} onClick={onBack}>
                Back
            </Button>

            <VStack spacing={6} align="stretch">
                <Heading>{label}</Heading>

                <Image
                    src={image}
                    alt={label}
                    maxW="400px"
                    objectFit="cover"
                    borderRadius="md"
                    alignSelf="center"
                />

                {mealType && (
                    <Text>
                        <strong>Meal type:</strong> {mealType.join(", ")}
                    </Text>
                )}

                {dishType && (
                    <Text>
                        <strong>Dish type:</strong> {dishType.join(", ")}
                    </Text>
                )}

                <Text>
                    <strong>Total cooking time:</strong>{" "}
                    {totalTime > 0 ? `${totalTime} minutes` : "N/A"}
                </Text>

                {dietLabels.length > 0 && (
                    <Text>
                        <strong>Diet:</strong> {dietLabels.join(", ")}
                    </Text>
                )}

                <Text>
                    <strong>Health labels:</strong> {healthLabels.join(", ")}
                </Text>

                {cautions.length > 0 && (
                    <Text>
                        <strong>Cautions:</strong> {cautions.join(", ")}
                    </Text>
                )}

                <Text>
                    <strong>Servings:</strong> {servings}
                </Text>

                <Box borderBottom="1px solid" borderColor="gray.300" my={4} />

                <Box>
                    <Heading size="md" mb={3}>
                        Ingredients
                    </Heading>
                    <VStack align="start" spacing={2}>
                        {ingredientLines.map((ingredient, index) => (
                            <Text key={index}>• {ingredient}</Text>
                        ))}
                    </VStack>
                </Box>

                <Box borderBottom="1px solid" borderColor="gray.300" my={4} />

                <Box>
                    <Heading size="md" mb={3}>
                        Total Nutrients
                    </Heading>

                    <VStack align="start" spacing={1}>
                        <Text>
                            <strong>Energy:</strong>{" "}
                            {Math.round(totalNutrients.ENERC_KCAL.quantity)} kcal
                        </Text>
                        <Text>
                            <strong>Protein:</strong>{" "}
                            {Math.round(totalNutrients.PROCNT.quantity)} g
                        </Text>
                        <Text>
                            <strong>Fat:</strong>{" "}
                            {Math.round(totalNutrients.FAT.quantity)} g
                        </Text>
                        <Text>
                            <strong>Carbs:</strong>{" "}
                            {Math.round(totalNutrients.CHOCDF.quantity)} g
                        </Text>
                        <Text>
                            <strong>Cholesterol:</strong>{" "}
                            {Math.round(totalNutrients.CHOLE.quantity)} mg
                        </Text>
                        <Text>
                            <strong>Sodium:</strong>{" "}
                            {Math.round(totalNutrients.NA.quantity)} mg
                        </Text>
                    </VStack>
                </Box>
            </VStack>
        </Box>
    );
};
