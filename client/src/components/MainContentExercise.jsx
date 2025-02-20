import { v4 as uuidv4 } from 'uuid';
import AnimalList from './AnimalList'
import NameListWithButtons from './NameListWithButtons'
import ProductTable from './ProductTable'
import SimpleButton from './SimpleButtonClick'
import RealTimeInputField from './RealtimeInputField'
import MultipleButtonClick from './MultipleButtonClick'
import CommentList from './LoopChallenge';
import GuessingGame from './GuessingGame';
import CardGenerator from './CardGenerator';



// List uppgift (loop)
const animals = ['Hund', 'Katt', 'Kanin']
// Loop uppgift med alert
const people = [
    { name: 'Max', age: 25, hobby: "Gaming" },
    { name: 'Robyn', age: 25, hobby: "Being the best" },
    { name: 'Carlo', age: 20, hobby: "Being random" },
]
// Loop uppgift med kategorier
const categories = [
    {
        category: "Frukt",
        id: uuidv4(),
        products: [
            { name: "Äpple", price: 10, id: uuidv4() },
            { name: "Banan", price: 5, id: uuidv4() },
        ],
    },
    {
        category: "Snacks",
        id: uuidv4(),
        products: [
            { name: "Chocklad", price: 25, id: uuidv4() },
            { name: "Chips", price: 35, id: uuidv4() },
        ],
    },
];
// Loop uppgift med kommentarer (utmaning)
const comments = [
    { id: uuidv4(), text: 'Detta är en awesome artikel!', likedBy: ['Anna', 'Björn', 'Max'] },
    { id: uuidv4(), text: 'Detta är en dålig artikel!', likedBy: ['Anna', 'Björn'] },
    { id: uuidv4(), text: 'Jag skulle vilja höra mer om dinosaurier!', likedBy: ['Carlo', 'Patrik', 'Anna'] },
    { id: uuidv4(), text: 'Skor är för det mesiga!', likedBy: ['Max', 'Björn'] },
    { id: uuidv4(), text: 'Intressanta tankar, tack för att du delar!', likedBy: ['Anna', 'Björn'] },
]
const numberToGuess = 54;


const MainContentExercise = () => {
    return (
        <main style={mainStyle}>
            <h1>Loopar</h1>
            <h2>1. Min Djurlista</h2>
            <AnimalList animals={animals} />
            <h2>2. Min Personlista</h2>
            <NameListWithButtons people={people} />
            <h2>3. Mitt table</h2>
            <ProductTable categories={categories} />
            <h2>4. Utmaning</h2>
            <CommentList comments={comments} />
            <h1>Events</h1>
            <h2>1. Tryck på knappen för att se ett meddelande</h2>
            <SimpleButton />
            <h2>2. Realtid input fält</h2>
            <RealTimeInputField />
            <h2>3. Knappar med egna alert från en komponent</h2>
            <MultipleButtonClick />
            <h2>4. Utmaning : Gissa</h2>
            <GuessingGame number={numberToGuess} />
            <h1>Komponenter</h1>
            <h2>4. Utmaning: Kortgenerator</h2>
            <CardGenerator />
        </main>
    )
}

const mainStyle = {
    padding: '20px',
    textAline: 'center'
}

export default MainContentExercise;