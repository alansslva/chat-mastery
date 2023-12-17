export interface RepositoryInterface {
    all(): any[];
    create(data: any): any;
    find(id: number): any;
}