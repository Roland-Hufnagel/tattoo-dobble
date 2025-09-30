export const data = [
  {
    width: 40,
    x: 30,
    y: 30,
  },
  {
    width: 40,
    x: 80,
    y: 30,
  },
  {
    width: 40,
    x: 30,
    y: 80,
  },
];
const cards = [
  {
    src: "public/img1.png",
    items: [
      {
        width: 40,
        x: 30,
        y: 30,
      },
      {
        width: 40,
        x: 80,
        y: 30,
      },
      {
        width: 40,
        x: 30,
        y: 80,
      },
    ],
  },
];
export const deck = [
  { symbols: [1, 8, 15, 22, 29, 36, 43, 50] },
  { symbols: [2, 9, 16, 23, 30, 37, 44, 50] },
  { symbols: [3, 10, 17, 24, 31, 38, 45, 50] },
  { symbols: [4, 11, 18, 25, 32, 39, 46, 50] },
  { symbols: [5, 12, 19, 26, 33, 40, 47, 50] },
  { symbols: [6, 13, 20, 27, 34, 41, 48, 50] },
  { symbols: [7, 14, 21, 28, 35, 42, 49, 50] },
  { symbols: [1, 9, 17, 25, 33, 41, 49, 51] },
  { symbols: [2, 10, 18, 26, 34, 42, 43, 51] },
  { symbols: [3, 11, 19, 27, 35, 36, 44, 51] },
  { symbols: [4, 12, 20, 28, 29, 37, 45, 51] },
  { symbols: [5, 13, 21, 22, 30, 38, 46, 51] },
  { symbols: [6, 14, 15, 23, 31, 39, 47, 51] },
  { symbols: [7, 8, 16, 24, 32, 40, 48, 51] },
  { symbols: [1, 10, 19, 28, 30, 39, 48, 52] },
  { symbols: [2, 11, 20, 22, 31, 40, 49, 52] },
  { symbols: [3, 12, 21, 23, 32, 41, 43, 52] },
  { symbols: [4, 13, 15, 24, 33, 42, 44, 52] },
  { symbols: [5, 14, 16, 25, 34, 36, 45, 52] },
  { symbols: [6, 8, 17, 26, 35, 37, 46, 52] },
  { symbols: [7, 9, 18, 27, 29, 38, 47, 52] },
  { symbols: [1, 11, 21, 24, 34, 37, 47, 53] },
  { symbols: [2, 12, 15, 25, 35, 38, 48, 53] },
  { symbols: [3, 13, 16, 26, 29, 39, 49, 53] },
  { symbols: [4, 14, 17, 27, 30, 40, 43, 53] },
  { symbols: [5, 8, 18, 28, 31, 41, 44, 53] },
  { symbols: [6, 9, 19, 22, 32, 42, 45, 53] },
  { symbols: [7, 10, 20, 23, 33, 36, 46, 53] },
  { symbols: [1, 12, 16, 27, 31, 42, 46, 54] },
  { symbols: [2, 13, 17, 28, 32, 36, 47, 54] },
  { symbols: [3, 14, 18, 22, 33, 37, 48, 54] },
  { symbols: [4, 8, 19, 23, 34, 38, 49, 54] },
  { symbols: [5, 9, 20, 24, 35, 39, 43, 54] },
  { symbols: [6, 10, 21, 25, 29, 40, 44, 54] },
  { symbols: [7, 11, 15, 26, 30, 41, 45, 54] },
  { symbols: [1, 13, 18, 23, 35, 40, 45, 55] },
  { symbols: [2, 14, 19, 24, 29, 41, 46, 55] },
  { symbols: [3, 8, 20, 25, 30, 42, 47, 55] },
  { symbols: [4, 9, 21, 26, 31, 36, 48, 55] },
  { symbols: [5, 10, 15, 27, 32, 37, 49, 55] },
  { symbols: [6, 11, 16, 28, 33, 38, 43, 55] },
  { symbols: [7, 12, 17, 22, 34, 39, 44, 55] },
  { symbols: [1, 14, 20, 26, 32, 38, 44, 56] },
  { symbols: [2, 8, 21, 27, 33, 39, 45, 56] },
  { symbols: [3, 9, 15, 28, 34, 40, 46, 56] },
  { symbols: [4, 10, 16, 22, 35, 41, 47, 56] },
  { symbols: [5, 11, 17, 23, 29, 42, 48, 56] },
  { symbols: [6, 12, 18, 24, 30, 36, 49, 56] },
  { symbols: [7, 13, 19, 25, 31, 37, 43, 56] },
  { symbols: [1, 2, 3, 4, 5, 6, 7, 57] },
  { symbols: [8, 9, 10, 11, 12, 13, 14, 57] },
  { symbols: [15, 16, 17, 18, 19, 20, 21, 57] },
  { symbols: [22, 23, 24, 25, 26, 27, 28, 57] },
  { symbols: [29, 30, 31, 32, 33, 34, 35, 57] },
  { symbols: [36, 37, 38, 39, 40, 41, 42, 57] },
  { symbols: [43, 44, 45, 46, 47, 48, 49, 57] },
  { symbols: [50, 51, 52, 53, 54, 55, 56, 57] },
];
export function getTwoRandomCards() {
  const firstIndex = Math.floor(Math.random() * cards.length);
  let secondIndex = Math.floor(Math.random() * cards.length);
  while (secondIndex === firstIndex) {
    secondIndex = Math.floor(Math.random() * cards.length);
  }
  return [cards[firstIndex], cards[secondIndex]];
}
export function getRandomDeck() {
  const shuffledDeck = deck.sort(() => 0.5 - Math.random());
  return shuffledDeck;
}
