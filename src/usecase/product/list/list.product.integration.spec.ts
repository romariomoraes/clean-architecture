import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Test list products", () => {
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

    it("should list a product", async () => {
        const repository = new ProductRepository();
        const usecase = new ListProductUseCase(repository);

        const p1 = ProductFactory.make("Product 1", 100);
        const p2 = ProductFactory.make("Product 2", 200);

        await repository.create(p1);
        await repository.create(p2);

        const output = await usecase.execute({});

        expect(output.products.length).toBe(2);
        
        expect(output.products[0].id).toBe(p1.id);
        expect(output.products[0].name).toBe(p1.name);
        expect(output.products[0].price).toBe(p1.price);
        
        expect(output.products[1].id).toBe(p2.id);
        expect(output.products[1].name).toBe(p2.name);
        expect(output.products[1].price).toBe(p2.price);
    });
});
