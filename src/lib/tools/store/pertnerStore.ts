import { create } from "zustand";

type PartnaireInfo = {
    pertner: Partenaire | null;
    setPertner: (user: Partenaire | null) => void;
}

export const PartenaireInformation = create<PartnaireInfo>((set) => ({
    pertner: null,
    setPertner: (pertner) => set({ pertner }),
}));