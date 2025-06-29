export interface Module {
  id: string;
  title: string;
  image: string;
  slug: string;
}

export interface Classes {
  id: string;
  title: string;
  link_url: string;
  description: string;
  moduleId: string;
  module: Module;
}
