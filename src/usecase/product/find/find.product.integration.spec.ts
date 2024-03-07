import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test find product use case", () => {
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

    it("should find a product", async () => {
        const repository = new ProductRepository();
        const usecase = new FindProductUseCase(repository);

        const product = new Product("1", "Product 1", 123.9);

        await repository.create(product);

        const input = {
            id: "1",
        };

        const output = {
            id: "1",
            name: "Product 1",
            price: 123.9,
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });
});
