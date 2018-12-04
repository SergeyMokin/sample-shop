module.exports = class Shop {
    constructor(emailService, shoppingBasketService, userService) {
        this.emailService = emailService;
        this.shoppingBasketService = shoppingBasketService;
        this.userService = userService;
    }

    async buy(userId) {
        let user = await this.userService.get(userId);
        let userBasket = await this.shoppingBasketService.get(userId);
        let cost = 0;
        
        for (let el of userBasket.purchases) {
            cost += el.cost;
        }

        let mail = await this.emailService.send({
            from: `Administrator <${this.emailService.senderEmail}>`,
            to: user.email,
            subject: 'Purchase',
            text: `Purchases: ${JSON.stringify(userBasket.purchases.map(x => x.title))} \nTotal cost: ${cost}$ \nSend your confirmation to this email. `
        });

        userBasket = this.shoppingBasketService.clear(userId);

        return {
            mail,
            userBasket
        };
    }
}