import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
    InputUpdateProductDto,
    OutputUpdateProductDto,
} from "./update.product.dto";

export default class UpdateProductUseCase {
    private repository: ProductRepositoryInterface;

    constructor(repository: ProductRepositoryInterface) {
        this.repository = repository;
    }

    async execute(
        input: InputUpdateProductDto
    ): Promise<OutputUpdateProductDto> {
        const product = await this.repository.find(input.id);

        product.changeName(input.name);
        product.changePrice(input.price);

        await this.repository.update(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
        };
    }
}
