export interface Card {
    title: string;
    description: string;
    image: string;
    type: CardType;
}

enum CardType {
    Paisagem = 1,
    Flor = 2,  
    Pizza = 3   
}