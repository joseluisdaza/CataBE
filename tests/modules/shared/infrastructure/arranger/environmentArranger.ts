export abstract class EnvironmentArranger {
	public abstract arrange(): Promise<void>;

	public abstract arrangeTable(tableName: string): Promise<void>;

	public abstract close(): Promise<void>;
}
