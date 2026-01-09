export const calculateDiscount = (currentPrice: number, previousPrice: number, numberDecimals?: number) => { 
    let discount = ((previousPrice - currentPrice) / previousPrice) * 100;
    return discount.toFixed(numberDecimals !== undefined ? numberDecimals : 2);
  }

  type ChargeSlab = [number, number]; // [limit, charge]

 export function getCharge(amount: number, chargesArray: ChargeSlab[]): number {
    for (let i = 0; i < chargesArray.length; i++) {
      const [limit, charge] = chargesArray[i];
  
      if (amount <= limit) {
        return charge;
      }
    }
    return 0; // agar koi slab match na ho
  }