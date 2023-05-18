export interface Shape {
  type: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  // Additional properties for Decentraland SDK usage
  size?: {
    width: number;
    height: number;
    depth: number;
  };
  rotation?: {
    x: number;
    y: number;
    z: number;
    order?: string;
  };
  color?: string;
  // ... add more properties as needed
}
