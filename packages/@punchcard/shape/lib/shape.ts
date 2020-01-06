import { ClassShape, ClassType } from './class';
import { Apply, Meta, Trait } from './metadata';
import { Visitor } from './visitor';

// Track this issue for the emitting of generic metadata by the TS compiler.
// https://github.com/Microsoft/TypeScript/issues/7169

/**
 * Root of the Shape type-system.
 */
export abstract class Shape {
  public readonly NodeType: 'shape' = 'shape';

  public abstract readonly Kind: keyof Visitor;

  public visit<V extends Visitor>(visitor: V, context: Visitor.ContextType<V>): ReturnType<V[this['Kind']]> {
    return visitor[this.Kind](this as any, context) as ReturnType<V[this['Kind']]>;
  }

  public apply<T extends Trait<this, any>>(trait: T): Apply<this, Trait.GetData<T>> {
    return Meta.apply(this, trait[Trait.Data]);
  }
}
export namespace Shape {
  export type Of<T extends Shape | ClassType> = T extends ClassType<any> ? ClassShape<T> : T;
}
