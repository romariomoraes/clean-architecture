import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const p1 = ProductFactory.make("Product 1", 100);
const p2 = ProductFactory.make("Product 2", 200);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest
            .fn()
            .mockReturnValue(Promise.resolve([p1, p2])),
    };
};

describe("Unit test for listing product use case", () => {
    it("should list a product", async () => {
        const repository = MockRepository();
        const useCase = new ListProductUseCase(repository);

        const output = await useCase.execute({});

        expect(output.products.length).toBe(2);
        
        expect(output.products[0].id).toBe(p1.id);
        expect(output.products[0].name).toBe(p1.name);
        expect(output.products[0].price).toBe(p1.price);
        
        expect(output.products[1].id).toBe(p2.id);
        expect(output.products[1].name).toBe(p2.name);
        expect(output.products[1].price).toBe(p2.price);
    });
});
