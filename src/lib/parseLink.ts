export function parseLink(dto: LinkDTO): Link {
  return {
    ...dto,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
    timesVisited: Number(dto.timesVisited),
  };
}
