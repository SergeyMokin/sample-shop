function groupBy(array, selector) {
    let uniqueKeys = array.map(selector).filter((value, index) => array.map(selector).indexOf(value) === index);
    let arr = [];
    for (let key of uniqueKeys) {
        let res = { key: key, values: [] };
        for (let el of array) {
            if (selector(el) === key) {
                res.values.push(el);
            }
        }
        arr.push(res);
    }
    return arr;
}

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

        let purchases = groupBy(userBasket.purchases, x => x._id);

        for (let p of purchases) {
            cost += p.values.length * p.values[0].cost;
        }

        if(cost <= 0){
            return {
                mail: null,
                userBasket
            }
        }

        let mail = await this.emailService.send({
            from: `Administrator <${this.emailService.senderEmail}>`,
            to: user.email,
            subject: 'Purchase',
            text: `Purchases: ${JSON.stringify(purchases.map(x => `${x.values[0].title} - ${x.values.length} * ${x.values[0].cost}$; `))} \nTotal cost: ${cost}$ \nSend your confirmation to this email. `
        });

        userBasket = this.shoppingBasketService.clear(userId);

        return {
            mail,
            userBasket
        };
    }
}