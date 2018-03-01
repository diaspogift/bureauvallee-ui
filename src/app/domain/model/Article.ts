
export class Article{
  private _id: number;
  private _title: string;
  private _body: string;
  private _object: string;
  private _createdBy: string;
  private _createdAt: string;
  private _updatedAt: string;
  private _publishedBy: string;
  private _publishedOn: string;
  private _createdByName: string;
  private _publishedByName: string;


  constructor(id: number, title: string, body: string, object: string, createdBy: string, createdAt: string, updatedAt: string, publishedBy: string, publishedOn: string, createdByName: string, publishedByName: string) {
    this._id = id;
    this._title = title;
    this._body = body;
    this._object = object;
    this._createdBy = createdBy;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._publishedBy = publishedBy;
    this._publishedOn = publishedOn;
    this._createdByName = createdByName;
    this._publishedByName = publishedByName;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get body(): string {
    return this._body;
  }

  set body(value: string) {
    this._body = value;
  }

  get object(): string {
    return this._object;
  }

  set object(value: string) {
    this._object = value;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value;
  }

  get createdAt(): string {
    return this._createdAt;
  }

  set createdAt(value: string) {
    this._createdAt = value;
  }

  get updatedAt(): string {
    return this._updatedAt;
  }

  set updatedAt(value: string) {
    this._updatedAt = value;
  }

  get publishedBy(): string {
    return this._publishedBy;
  }

  set publishedBy(value: string) {
    this._publishedBy = value;
  }

  get publishedOn(): string {
    return this._publishedOn;
  }

  set publishedOn(value: string) {
    this._publishedOn = value;
  }

  get createdByName(): string {
    return this._createdByName;
  }

  set createdByName(value: string) {
    this._createdByName = value;
  }

  get publishedByName(): string {
    return this._publishedByName;
  }

  set publishedByName(value: string) {
    this._publishedByName = value;
  }
}
