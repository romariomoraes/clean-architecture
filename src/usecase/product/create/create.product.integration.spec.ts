import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("create a product", async () => {
        const repository = new ProductRepository();
        const usecase = new CreateProductUseCase(repository);

        const input = {
            name: "Product 1",
            price: 123.9
        };
        const result = await usecase.execute(input);

        const output = {
            id: expect.any(String),
            name: "Product 1",
            price: 123.9,
        };

        expect(result).toEqual(output);
    });
});
