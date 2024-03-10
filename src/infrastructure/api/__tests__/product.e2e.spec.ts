import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app).post("/product").send({
            name: "Product 1",
            price: 132.98,
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product 1");
        expect(response.body.price).toBe(132.98);
    });

    it("should not create a product", async () => {
        const response = await request(app).post("/product").send({
            name: "Product 1",
        });
        expect(response.status).toBe(500);
    });

    it("should list all product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                price: 100,
            });
        expect(response.status).toBe(200);

        const response2 = await request(app)
            .post("/product")
            .send({
                name: "Product 2",
                price: 200,
            });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);

        const product = listResponse.body.products[0];
        expect(product.name).toBe("Product 1");
        expect(product.price).toBe(100);

        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("Product 2");
        expect(product2.price).toBe(200);

        // const listResponseXML = await request(app)
        //     .get("/customer")
        //     .set("Accept", "application/xml")
        //     .send();

        // expect(listResponseXML.status).toBe(200);
        // expect(listResponseXML.text).toContain(
        //     `<?xml version="1.0" encoding="UTF-8"?>`
        // );
        // expect(listResponseXML.text).toContain(`<customers>`);
        // expect(listResponseXML.text).toContain(`<customer>`);
        // expect(listResponseXML.text).toContain(`<name>John</name>`);
        // expect(listResponseXML.text).toContain(`<address>`);
        // expect(listResponseXML.text).toContain(`<street>Street</street>`);
        // expect(listResponseXML.text).toContain(`<city>City</city>`);
        // expect(listResponseXML.text).toContain(`<number>123</number>`);
        // expect(listResponseXML.text).toContain(`<zip>12345</zip>`);
        // expect(listResponseXML.text).toContain(`</address>`);
        // expect(listResponseXML.text).toContain(`</customer>`);
        // expect(listResponseXML.text).toContain(`<name>Jane</name>`);
        // expect(listResponseXML.text).toContain(`<street>Street 2</street>`);
        // expect(listResponseXML.text).toContain(`</customers>`);
    });
});
