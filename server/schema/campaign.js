import { CampaignTC } from "../model/campaign.js";

const campaignQuery = {
    campaignById: CampaignTC.getResolver('findById'),
    campaignByIds: CampaignTC.getResolver('findByIds'),
    campaignOne: CampaignTC.getResolver('findOne'),
    campaignMany: CampaignTC.getResolver('findMany'),
    campaignCount: CampaignTC.getResolver('count'),
    campaignConnection: CampaignTC.getResolver('connection'),
    campaignPagination: CampaignTC.getResolver('pagination'),

}

const campaignMutation = {
    campaignCreateOne: CampaignTC.getResolver('createOne'),
    campaignCreateMany: CampaignTC.getResolver('createMany'),
    campaignUpdateById: CampaignTC.getResolver('updateById'),
    campaignUpdateOne: CampaignTC.getResolver('updateOne'),
    campaignUpdateMany: CampaignTC.getResolver('updateMany'),
    campaignRemoveById: CampaignTC.getResolver('removeById'),
    campaignRemoveOne: CampaignTC.getResolver('removeOne'),
    campaignRemoveMany: CampaignTC.getResolver('removeMany'),
}

export {campaignQuery, campaignMutation}