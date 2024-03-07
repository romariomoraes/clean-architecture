import CreateProductUseCase from "./create.product.usecase";

const input = {
    name: "Product 1",
    price: 135.89,
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const repository = MockRepository();
        const useCase = new CreateProductUseCase(repository);

        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });
    });

    it("should thrown an error when name is missing", async () => {
        const repository = MockRepository();
        const useCase = new CreateProductUseCase(repository);

        input.name = "";

        await expect(useCase.execute(input)).rejects.toThrow(
            "Name is required"
        );

        input.name = "Product 1";
    });

    it("should throw error when price is less than zero", async () => {
        const repository = MockRepository();
        const useCase = new CreateProductUseCase(repository);

        input.price = -1;

        await expect(useCase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        );
    });
});