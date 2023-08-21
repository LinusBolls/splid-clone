export type EntitiesStore<Entity extends unknown> = {
  groups: Entity[];

  actions: {
    addGroup: (group: Entity) => Entity;
    setGroups: (groups: Entity[]) => Entity[];
    updateGroup: (groupId: string, group: Entity) => Entity;
    removeGroup: (groupId: string) => void;
    clear: () => void;
  };
};
