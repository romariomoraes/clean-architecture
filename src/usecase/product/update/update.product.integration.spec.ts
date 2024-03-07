import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "../create/create.product.usecase";
import UpdateProductUseCase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";
import { InputUpdateProductDto } from "./update.product.dto";

describe("Test update product use case", () => {
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

    it("update a product", async () => {
        const repository = new ProductRepository();
        const useCase = new UpdateProductUseCase(repository);

        const product = ProductFactory.make("Product 1", 123.9);
        await repository.create(product);
        const p = await repository.find(product.id);

        p.changeName("Product 1 : change name");

        const input = {
            id: p.id,
            name: p.name,
            price: p.price
        };

        const result = await useCase.execute(input);

        const output = {
            id: expect.any(String),
            name: "Product 1 : change name",
            price: 123.9
        };

        expect(result.name).toEqual(output.name);
    });
});
