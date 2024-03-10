import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const useCase = new CreateProductUseCase(new ProductRepository());
    try {
        const dto = {
            name: req.body.name,
            price: req.body.price,
        };
        const output = await useCase.execute(dto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get("/", async (req: Request, res: Response) => {
    const usecase = new ListProductUseCase(new ProductRepository());
    try {
        const output = await usecase.execute({});
        res.send(output);
    } catch (error) {
        res.status(500).send(error);
    }

    // res.format({
    //     json: async () => res.send(output),
    //     xml: async () => res.send(CustomerPresenter.listXML(output)),
    // });
});
