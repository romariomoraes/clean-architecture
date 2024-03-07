import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product 1", 123.9);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit Test find product use case", () => {
    it("should find a product", async () => {
        const repository = MockRepository();
        const usecase = new FindProductUseCase(repository);

        const input = {
            id: "123",
        };

        const output = {
            id: "123",
            name: "Product 1",
            price: 123.9,
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });
});
